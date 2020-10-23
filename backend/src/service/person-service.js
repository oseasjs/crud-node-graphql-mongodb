import {Person} from "../models/person-model";

class PersonService {

  async findAll() {
    return Person.find().limit(100);
  }

  async findById(id) {
    return Person.findById(id);
  }

  async create(personInput) {
    const person = new Person(personInput);
    person.registered = new Date();
    return person.save();
  }

  async update(id, personInput) {
    return Person.findByIdAndUpdate(id, personInput, {
      new: true,
    });
  }

  async remove(id) {
    await Person.findByIdAndRemove(id);
    return true;
  }

}

export const personService = new PersonService();