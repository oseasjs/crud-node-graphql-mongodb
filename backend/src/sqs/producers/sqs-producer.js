import {sqs, vars} from "../../config/sqs-config";

export const sendMessageRU = async (json) => {
  await sendMessage(json, vars.randomUserQueue);
}

export const sendMessagePerson = async (json) => {
  await sendMessage(json, vars.personQueue);
}

const sendMessage = async (json, queueName) => {

  console.log("SQS Queue sendMessage json: ", json);  

  var params = {
    DelaySeconds: 10,
    MessageBody: JSON.stringify(json),
    QueueUrl: vars.prefixQueueUrl + queueName
  };

  await sqs.sendMessage(params, function(err, data) {
    if (err) {
      throw err;
    } 
    else {
      console.log('Message sended to queue: %s, with MessageId: %s', 
        queueName, 
        JSON.stringify(data.MessageId));
    }
  })

}