import {vars, receiveMessages, deleteMessage} from "../../config/sqs-config";
import {personService} from "../../service/person-service";

export const receiveMessagesPerson = async () => {

  const messages = await receiveMessages(vars.personQueueUrl);
  if (messages) {
    await processReceivedMessagesPerson(messages);
  }
 
}

const processReceivedMessagesPerson = async (messages) => {

  console.log('Total Messages returned from queue %s: %s', vars.personQueueUrl, messages.length);
  
  for await (const message of messages) {

    await processReceivedMessagePerson(message);
    await deleteMessage(message.ReceiptHandle, vars.personQueue);

  }

}

const processReceivedMessagePerson = async (message) => {

  const {name, email} = JSON.parse(message.Body);
  let person = await personService.create({name, email});
  
  console.log('Person saved with success: ', person.id);

}