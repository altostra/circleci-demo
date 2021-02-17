const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient();
const util = require('util')

const TABLE_ARN = process.env.TABLE_VACCINESUSAGETABLE01

module.exports.handler = async (event) => {

  const rawMessage = event.Records[0].Sns.Message;
  const message = JSON.parse(rawMessage);

  const item = {
    'userId': message.userId,
    'dose': message.dose,
    'type': message.type,
    'batch': message.batchId,
    'date': message.date,
    'dosage': message.dosage
  }

  console.log(`Saving vaccination dosage: ${util.inspect(item)}`)

  var params = {
    TableName: TABLE_ARN,
    Item: item
  };

  await docClient.put(params).promise();
}