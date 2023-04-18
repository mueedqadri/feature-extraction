AWS Lambda Function README
==========================

This AWS Lambda function is designed to run whenever an object is created or modified in an S3 bucket. It retrieves the content of the object, searches for words that start with an uppercase letter and are at least 3 characters long, and counts the occurrences of each word. Finally, it saves the result as a JSON object in a new file with a similar name to the original file, but with "ne.txt" added to the end of the name.

Prerequisites
-------------

This Lambda function requires the `aws-sdk` library, which can be installed using npm:

Copy code

`npm install aws-sdk`

In addition, you need to have an AWS account and create an S3 bucket to store the objects that trigger the Lambda function.

Installation
------------

1.  Create a new AWS Lambda function and select "Author from scratch".

2.  Choose a name for the function and select "Node.js 14.x" as the runtime.

3.  In the "Function code" section, copy and paste the code from `index.js` into the editor.

4.  In the "Environment variables" section, add the following environment variable:

    -   `BUCKET_NAME`: The name of the S3 bucket where the output file will be stored.
5.  In the "Execution role" section, create a new role with the following policy document:

    jsonCopy code

    `{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents"
                ],
                "Resource": "arn:aws:logs:*:*:*"
            },
            {
                "Effect": "Allow",
                "Action": [
                    "s3:GetObject",
                    "s3:PutObject"
                ],
                "Resource": [
                    "arn:aws:s3:::YOUR_BUCKET_NAME/*"
                ]
            }
        ]
    }`

    Replace `YOUR_BUCKET_NAME` with the name of your S3 bucket.

6.  Save the function.

Usage
-----

Upload a file to the S3 bucket that triggers the Lambda function. The function will process the file and create a new file with the same name, but with "ne.txt" added to the end of the name, in the same bucket.

License
-------

This project is licensed under the MIT License - see the LICENSE file for details.
