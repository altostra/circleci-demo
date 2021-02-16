
exports.handler = async (event) => {

  const rawMessage = event.Records[0].Sns.Message;
  const message = JSON.parse(rawMessage);

  console.log(`Updating user ${message.userId} medical record on internal systems`);

}
