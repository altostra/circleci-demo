const AWS = require('aws-sdk')

function authenticateRequest() {
  console.log(`Authenticating the request`)
}

function validateRequest() {
  console.log(`Validating the request`)
}

function getNextDoseDate(firstDose) {
  const fd = new Date(firstDose)

  let nd = new Date()
  nd.setDate(fd.getDate() + 21)

  return nd.toDateString()
}


exports.handler = async (event) => {

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

  console.log(`Scheduing next dose appointment for user: ${body.userId}`)

  const nextDoseDate = getNextDoseDate(body.firstDoseDate)

  return {
    statusCode: 200,
    body: `${nextDoseDate}`,
  };
};