const mongoose = require("mongoose");
require("dotenv").config();

const conectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,

};

//const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jxnvmec.mongodb.net/?retryWrites=true&w=majority`;
//const uri = `mongodb+srv://pratikvbhute:EG1JEjhdGQABQIXI@cluster0.jxnvmec.mongodb.net/?retryWrites=true&w=majority`;

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jxnvmec.mongodb.net/testdb?retryWrites=true&w=majority`;

const connexion = mongoose
  .connect(uri, conectionParams)
  .then(() => console.log("Connected to cloud atlas"))
  .catch( (err) => 
  console.log(err));

  module.exports = connexion;
