import {gql} from "apollo-server-express";

export const mutation = gql`
  type Mutation {
    generatePersons(total: Int!) : [Person],
    createPerson(personInput: PersonInput) : Person,
    updatePerson(id: ID!, personInput: PersonInput) : Person,
    deletePerson(id: ID!) : Boolean,
  }
`;