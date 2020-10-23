import {sendMessageRU} from "../sqs/producers/sqs-producer";
import {personService} from "../service/person-service";

export const personResolver = {

  Query: {
    persons() {
      return personService.findAll();
    },
    person(_, { id }) {
      return personService.findById(id);
    },
  },

  Mutation: {

    generatePersons : async (_, {total}) => {

      console.log('### generatePersons: ', total);
      await sendMessageRU({total: total, time: new Date().getTime()});
      return total;

    },
    
    async createPerson(_, {personInput}) {
      return await personService.create(personInput);
    },
    
    async updatePerson(_, { id, personInput }) {
      return await personService.update(id, personInput);
    },
    
    async deletePerson(_, { id }) {
      return await personService.remove(id);
    },

  },

};