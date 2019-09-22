const AWS = require('aws-sdk');
const AWSConfig = {
  "region": 'us-west-2',
  "endpoint": process.env.endpoint,
  "accessKeyId": process.env.accessKey, "secretAccessKey": process.env.secretKey
};
AWS.config.update(AWSConfig);
let documentClient = new AWS.DynamoDB.DocumentClient();

const OK = 200;
const ERR = 500;

module.exports = class DB {
  write(id, data, table) {
    return new Promise((resolve) => {
      let params = {
        TableName: table,
        Item: {
          'ID': id, 
          'Name': data.name,
          'Email': data.email,
          'Message': data.message
        }
      }
      documentClient.put(params, (err, data) => {
        if (err) {
          resolve({
            statusCode: ERR,
            body: 'Could not save message'
          });
        }
        else {
          resolve({
            statusCode: OK,
            body: 'Save message successful'
          });
        }
      });
    });
  }
}