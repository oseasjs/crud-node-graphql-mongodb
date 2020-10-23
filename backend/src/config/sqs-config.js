import AWS from 'aws-sdk';
import {receiveMessagesRU} from "../sqs/consumers/ru-sqs-consumer";
import {receiveMessagesPerson} from "../sqs/consumers/person-sqs-consumer";

AWS.config.update({ region: 'us-east-1' });
const LOCALSTACK_URL = 'http://localhost:4566';

const RANDOM_USER_QUEUE = 'random-user-queue';
const PERSON_QUEUE = 'person-queue';

const PREFIX_QUEUE_URL = LOCALSTACK_URL + '/000000000000/';

export const sqs = new AWS.SQS({ endpoint: LOCALSTACK_URL });

export const vars = {
  localStackUrl: LOCALSTACK_URL,
  randomUserQueue: RANDOM_USER_QUEUE,
  personQueue: PERSON_QUEUE,
  expectedQueues: [RANDOM_USER_QUEUE, PERSON_QUEUE],
  prefixQueueUrl: PREFIX_QUEUE_URL,
  randomUserQueueUrl: PREFIX_QUEUE_URL + RANDOM_USER_QUEUE,
  personQueueUrl: PREFIX_QUEUE_URL + PERSON_QUEUE,
  baseRandomUserUrl: 'https://randomuser.me/api/?results='
}

export const sqsInit = async () => {

  const sqsQueuesUrls = await listQueues();
  createQueuesIfNotExists(sqsQueuesUrls);

  setInterval(receiveMessagesRU, 3000);
  setInterval(receiveMessagesPerson, 3000);
  
  // aws --endpoint-url=http://localhost:4566 sqs list-queues
  // aws sqs delete-queue --queue-url http://localhost:4566/000000000000/MY_QUEUE --endpoint-url=http://localhost:4566
  // aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name myqueue

}

export const receiveMessages = async (queueUrl) => {

  let params = {
    QueueUrl: queueUrl,
    AttributeNames: ["SentTimestamp"],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: ["All"],
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0
  };

  return await sqs.receiveMessage(params, function(err, data) {
      if (err) {
        console.log('Error on receiveMessage', err);
      }        
    })
    .promise()  
    .then((data) => data.Messages);
   
}

export const deleteMessage = async (ReceiptHandle, queueName) => {

  const deleteParams = {
    QueueUrl: vars.prefixQueueUrl + queueName,
    ReceiptHandle
  };

  await sqs.deleteMessage(deleteParams, function(err, data) {
      if (err) {
        console.log('Error on deleteMessage', err);
      }   
    });

}

const listQueues = async () => {

  return await sqs.listQueues({}, function(err, data) {
    if (err) {
      console.log('Error on listQueues', err);
    }    
  })
  .promise()
  .then((data) => data.QueueUrls);

}

const createQueuesIfNotExists = (sqsQueuesUrls) => {

  vars.expectedQueues.forEach(queueName => {

    if (!sqsQueuesUrls || sqsQueuesUrls.filter(url => url.includes(queueName)).length === 0) {

      console.warn("Missing SQS Queue: ", queueName);  
      createQueues(queueName);
      console.log("SQS Queue created: ", queueName);  
    }

  });  

}

const createQueues = async (queueName) => {

  let params = {
    QueueName: queueName,
    Attributes: {
      'DelaySeconds': '60',
      'MessageRetentionPeriod': '86400'
    }
  };

  return await sqs.createQueue(params, function(err, data) {
    if (err) {
      console.log('Error on createQueue', err);
    }
  });

}

