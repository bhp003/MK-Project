const AWS = require('aws-sdk');
let AWSConfig = {
  "region": 'us-west-1',
  "endpoint": process.env.endpoint,
  "accessKeyId": process.env.accessKey, "secretAccessKey": process.env.secretKey
};
AWS.config.update(AWSConfig);
let documentClient = new AWS.DynamoDB.DocumentClient();

module.exports = class DB {
  write(id, data, table) {
    let params = {
      TableName: table,
      Item: {
        'ID': id, 
        'Name': data.name,
        'Email': data.email,
        'Message': data.message
      }
    }
    return documentClient.put(params, (err, data) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(data);
      }
    }).promise();
  }
}