# CRUD NODE GRAPHQL MONGODB SQS

Project to implement a CRUD with NodeJS, GraphQL, MongoDB and SQS


### Inspiration

This project was inspired on:

- Ben Awad class on youtube: https://www.youtube.com/watch?v=YFkJGEefgU8
- Emerson Pereira article on Medium: https://medium.com/@renato.groffe/mongodb-mongo-express-docker-compose-montando-rapidamente-um-ambiente-para-uso-824f25ca6957



### Main Dependencies:

- node
- yarn
- apollo-express
- mongoose
- axios
- mongodb
- aws-sdk

### Modules

- Backend files in under **/backend** folder
- Front files in under **/frontend** folder (_upcomming_)


### Instalation

On backend folder, run: 

```npm install```


### Running backend module

On **backend** folder, run: 

``` npm run start:dev ```

``` yarn start:dev ```


### Backend Implementation

- **Project structure**: Following common structure suggest by Emerson Pereira (link above): typeDefs, resolvers and models
- **/typeDev**: first layer, configure graphql queries, mutations and types;
- **/resolvers**: second layer, receive data from graphql and send to service layer;
- **/model**: persistence entity using mongo db schema;
- **/service**: receive data from resolvers and producers, implement some business rules, convert to mongo format and call persistence;
- **/config**: mongo db connection configuration;
- **/sqs**: generate person using asyncronous message with sqs. Using randomuser api with axios to generate person data to persist generated data on mongo db. There are 2 queues used on async process: random-user-queue and person-queue. Both queues is bean created by sqsInit method. For Idempotent control should used Redis (_upcommig_);

### Graphql Playgroud Query/Mutation Example:

- **List Person**: 
`
  {
    persons {
      id,
      name,
      email
    }
  }
`

<br/>

- **Add Person**:
`
mutation {
  createPerson(
    personInput : {
    	name: "Mary Alves", 
      email: "mary.alves@email.com"
  	}
  ) {
    id,
    name,
    email
  }
}
`

<br/>

- **Find Person by Id**:
`
{
  person(id: "5f88da953979ec67040b6a3a") {
    id,
    name,
    email
  }
}
`

<br/>

- **Update Person**:
`
mutation {
  updatePerson(
    id: "5f88da953979ec67040b6a3a",
    personInput: {
      name: "Mary Help", 
      email: "mary.help@email.com"
    }
  ) {
    id,
    name,
    email
  }
}
`

<br/>

- **Delete Person**:
`
mutation {
  deletePerson(id: "5f88da953979ec67040b6a3a")
}
`

<br/>

- **Generate Person from random user using async process**:
`
mutation {
  generatePersons(total: 2) {
    id,
    name,
    email
  }
}
`

<br/>

### Front Implementation

_Upcomming_


### Docker Compose

There is a docker compose on ./local/docker-compose.yml with MongoDB, Mongo Express, Localstack containner (SNS and SQS service) and Redis for idempotent control, that could be run with command:

```docker-compose up -d```


After run docker-compose, you can access:

- GraphQL Playground: http://localhost:4000/graphql
- Mongo-Express: http://localhost:8081/db/ (username: admin | password: admin)
- Random User: https://randomuser.me/api/?results=2

Some aws-cli commands very helpful to manipulate queues

- aws --endpoint-url=http://localhost:4566 sqs list-queues
- aws sqs delete-queue --queue-url http://localhost:4566/000000000000/person-queue --endpoint-url=http://localhost:4566
- aws --endpoint-url=http://localhost:4566 sqs list-queues
- aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name myqueue

### Tests

Not implemented yet 😱