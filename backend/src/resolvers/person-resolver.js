import {Person} from "../models/person-model";
import axios from "axios";

export const personResolver = {

  Query: {
    persons() {
      return Person.find();
    },
    person(_, { id }) {
      return Person.findById(id);
    },
  },

  Mutation: {

    generatePersons : async (_, {total}) => {

      const persons = [];
      const url = 'https://randomuser.me/api/?results=' + total;
      
      let response = await axios.get(url)
        .catch(error => {
          console.log(error);
          throw error;
        });

      for await (const _person of response.data.results) {

        const name = _person.name.first + ' ' + _person.name.last
        const email = _person.email;
        const registered = new Date();
        
        const person = new Person({name, email, registered});

        await person.save();    
        persons.push(person);

      };

      return persons;
      
    },
    
    createPerson(_, {personInput}) {
      const person = new Person(personInput);
      person.registered = new Date();
      return person.save();
    },
    
    updatePerson(_, { id, personInput }) {
      return Person.findByIdAndUpdate(id, personInput, {
        new: true,
      });
    },
    
    deletePerson(_, { id }) {
      return Person.findByIdAndRemove(id);
    },

  },
};