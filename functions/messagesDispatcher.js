const AWS = require('aws-sdk')
const sns = new AWS.SNS()

const MESSAGES_TOPIC = process.env.TOPIC_MESSAGINGBUS01

function authenticateRequest() {
  console.log(`Authenticating the request`)
}

function validateRequest() {
  console.log(`Validating the request`)
}



exports.handler = async (event) => {

  console.log(`Processing a vaccination request`)

  authenticateRequest(event)

  validateRequest(event)

  let body

  if (event.body) {
    body = JSON.parse(event.body)
  } else {
    return {
      statusCode: 400,
      body: `Bad Request, body not present`,
    }
  }

  const message = {
    TopicArn: MESSAGES_TOPIC,
    Message: JSON.stringify(body),
    MessageAttributes: {
      EVENT_TYPE: {
        DataType: 'String',
        StringValue: body.type,
      }
    }
  };

  // Create promise and SNS service object
  await sns.publish(message).promise();

  return {
    statusCode: 200,
    body: `Message received successfully`,
  };
};
