const AWS = require('aws-sdk')
const sns = new AWS.SNS()

const MOH_TOPIC = process.env.TOPIC_FOLLOWUPMAILSENDER01

exports.handler = async (event) => {

  const rawMessage = event.Records[0].Sns.Message;
  const message = JSON.parse(rawMessage);

  console.log(`Notifing the MOH on another successful vaccination`)

  const message = {
    TopicArn: MOH_TOPIC,
    Message: JSON.stringify({
      userId: message.userId,
      dose: message.dose,
      date: message.date
    })
  };

  // Create promise and SNS service object
  await sns.publish(message).promise();

  return {
    statusCode: 200,
    body: `Message received successfully`,
  };
};
