import mongoose from 'mongoose';

const PersonSchema = mongoose.Schema({
  name: String,
  email: String, 
  registered: Date
});

export const Person = mongoose.model('Person', PersonSchema);