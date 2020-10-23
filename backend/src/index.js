import {ApolloServer} from "apollo-server-express";
import express from "express";
import {mongoDbConnect} from './config/mongo-db-config';
import {typeDefs} from "./typeDefs";
import {resolvers} from "./resolvers";
import {sqsInit} from "./config/sqs-config";

const startServer = async () => {

  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app });

  mongoDbConnect();

  sqsInit();

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );

}

startServer();