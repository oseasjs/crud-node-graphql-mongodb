import mongoose from 'mongoose';

const options = { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  user: 'admin', 
  pass: 'admin'
};

const connectionString = 'mongodb://localhost:27017/crud-node-graphql-mongo?authSource=admin';

export const mongoDbConnect = async () => {

  mongoose.connect(connectionString, options);

  mongoose.connection.on('connected', function (err) {
    console.log("Connected to DB using chain: " + connectionString);
  });

  mongoose.connection.on('error', function (err) {
    console.log(err);
  });

  mongoose.connection.on('disconnected', function () {
    self.connectToDatabase();
  });

}