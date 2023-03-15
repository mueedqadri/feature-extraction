const AWS = require("aws-sdk");
const d = new Date();
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler =  async (event, context, error) => {
  try {
    let s3 = new AWS.S3();
    let Key = event.Records[0].s3.object.key;
    let Bucket = event.Records[0].s3.bucket.name;
    let body;
    let name = Key.split(".")[0].split("/")[1];
    let count;
    let time;
    let res = await s3.getObject({ Bucket, Key }, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        error(err);
      } 
      else {
          body = String(data.Body);
          body = JSON.parse(body);
      };
    }).promise();
    for (var props in body[name]){
      const params = {
            TableName: "word_count",
            Key:
            {
                NameEntity: props
            },
            AttributesToGet: [
              'NameEntity,',
              'Frequency',
              'TimeOfEntry'
            ]
        }
      let result = await dynamo.get(params).promise();
      console.log(result)
      if(result.hasOwnProperty('Item')){
        count = parseInt(result['Item']['Frequency']) + parseInt(body[name][props]);
        time = result['Item']['TimeOfEntry'];
      }else {
        count = body[name][props];
        time = d.toLocaleString()
      }
      let res = await dynamo.put({
          TableName: "word_count",
          Item: {
            NameEntity: props,
            Frequency: count,
            TimeOfEntry: time
          }
        }).promise();
    }
  } catch (err) {
    console.log(err, err.stack);
  } 
};
