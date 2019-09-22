const DB = require('./dynamo');
const uuid = require('uuid/v1');
const dynamo = new DB();

exports.handler = async (event, context, callback) => {
  const data = event;
  const id = uuid();
  const respond = await dynamo.write(id, data, process.env.tableName);
  return respond;
}