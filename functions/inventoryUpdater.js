const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient();
const util = require('util')

const TABLE_ARN = process.env.TABLE_VACCINESUSAGETABLE01

module.exports.handler = async (event) => {

  const rawMessage = event.Records[0].Sns.Message;
  const message = JSON.parse(rawMessage);

  const item = {
    'userId': message.userId,
    'vaccineType': message.type,
    'vaccineBatch': message.batchId,
    'vaccinationDate': message.date,
    'vaccineDose': message.dose
  }

  console.log(`Saving vaccination dosage: ${util.inspect(item)}`)

  var params = {
    TableName: TABLE_ARN,
    Item: item
  };

  await docClient.put(params).promise();
}