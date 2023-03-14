let AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
    let s3 = new AWS.S3();
    let Key = event.Records[0].s3.object.key;
    let Bucket = event.Records[0].s3.bucket.name;
    let body;
    s3.getObject({ Bucket, Key }, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            callback(err);
        } else {
            body = String(data.Body);
            let wordArray = body.match(/[A-Z]([A-Za-z]+){2}/gm);
            let wordObj = {};
            wordArray.map(i =>{
                if(wordObj.hasOwnProperty(i)){
                  wordObj[i] = wordObj[i] + 1;
                }else {
                  wordObj[i] = 1;
                }
            })
            let docId = Key.split(".")[0].split("/")[1] +"ne";
            wordObj = {
              [docId]: wordObj
            }
            let params = {
            Bucket : 'secondb00883865',
            Key : Key.split(".")[0]+"ne.txt",
            Body : JSON.stringify(wordObj),
        };
        s3.putObject(params, function(err, data) {
          if (err) console.log(err, err.stack); 
        });
        }
    });   
}
