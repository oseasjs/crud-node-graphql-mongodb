# CRUD NODE GRAPHQL MONGODB SQS

Project to implement a CRUD with NodeJS, GraphQL, MongoDB and SQS


### Inspiration

This project was inspired on:

- Ben Awad class on youtube: https://www.youtube.com/watch?v=YFkJGEefgU8
- Emerson Pereira article on Medium: https://medium.com/@renato.groffe/mongodb-mongo-express-docker-compose-montando-rapidamente-um-ambiente-para-uso-824f25ca6957



### Main Dependencies:

- node
- yarn
- apollo
- mongoose
- axios
- mongodb
- aws-sdk

### Modules

- Backend files in under /backend folder
- Front files in under /fornt folder (upcomming)


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
- **/resolvers**: second layer, receive data from graphql, implement some business rules, convert to mongo format and call persistence;
- **/model**: persistence entity using mongo db schema;
- **/config**: mongo db connection configuration;
- **/sqs**: generate person using asyncronous message with sns/sqs and redis to idempotent control. Using randomuser api with axios to generate person data to persist generated data on mongo db; 

### Graphql Playgroud Query/Mutation Example:

- List Person: 
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
- Add Person:
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
- Find Person by Id:
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
- Update Person:
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
- Delete Person:
`
mutation {
  deletePerson(id: "5f88da953979ec67040b6a3a")
}
`
<br/>

- Generate Person from random user:
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

There is a docker compose on ./local/docker-compose.yml with MongoDB, Mongo Express, Redis and Localstack containner (SNS and SQS service), that could be run with command:

```docker-compose up -d```


After run docker-compose, you can access:

- GraphQL Playground: http://localhost:4000/graphql
- Mongo-Express: http://localhost:8081/db/ (username: admin | password: admin)
- Random User: https://randomuser.me/api/?results=2


### Tests

Not implemented yet 😱