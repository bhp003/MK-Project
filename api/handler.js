const DB = require('./dynamo');
const uuid = require('uuid/v1');
const dynamo = new DB();

const OK = 200;
const ERR = 504;

exports.handler = async (event) => {
  const data = event;
  const id = uuid();
  dynamo.write(id, data, "MessageTable").then(() => {
    callback(null, {
      statusCode: OK
    });
  }).catch(() => {
    callback(null, {
      statusCode: ERR
    });
  });
  
}