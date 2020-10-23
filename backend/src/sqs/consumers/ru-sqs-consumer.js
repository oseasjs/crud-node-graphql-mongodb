import {vars, receiveMessages, deleteMessage} from "../../config/sqs-config";
import axios from "axios";
import {sendMessagePerson} from "../producers/sqs-producer";

export const receiveMessagesRU = async () => {

  const messages = await receiveMessages(vars.randomUserQueueUrl);
  if (messages) {
    await processReceivedMessagesRU(messages);
  }
  
}

const processReceivedMessagesRU = async (messages) => {

  console.log('Total Messages returned from queue %s: %s', vars.randomUserQueue, messages.length);
  
  for await (const message of messages) {

    await processReceivedMessage(message);
    await deleteMessage(message.ReceiptHandle, vars.randomUserQueue);

  }

}

const processReceivedMessage = async (message) => {

  const total = JSON.parse(message.Body).total;
  
  let personRUList = await getPersonFromRU(total);

  for await (const personRU of personRUList) {

    const person = {
      name: personRU.name.first + ' ' + personRU.name.last,
      email: personRU.email
    };

    await sendMessagePerson(person);

    console.log('Message sended to person queue: ', person);

  }  

}

const getPersonFromRU = async (total) => {

  let response = await axios.get(vars.baseRandomUserUrl + total)
      .catch(error => {
        console.log(error);
        throw error;
      });

  console.log('Axios Response: ', response.data.results.length);

  return response.data.results;

}