import {gql} from "apollo-server-express";

export const query = gql`
  type Query {
    persons: [Person!]!
    person(id: ID!): Person
  }
`;