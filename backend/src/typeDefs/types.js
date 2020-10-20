import {gql} from "apollo-server-express";

export const types = gql`
    type Person {
      id: ID!,
      name: String!,
      email: String!
    }
    
    input PersonInput {
      name: String!,
      email: String!
    }
`;