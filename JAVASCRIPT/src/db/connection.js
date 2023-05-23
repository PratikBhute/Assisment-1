const mongoose = require("mongoose");
//require("dotenv").config();

const conectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,

};

const uri = 
`mongodb+srv://user_01:root@cluster0.jxnvmec.mongodb.net/testdb?retryWrites=true&w=majority`;

const connexion = mongoose
  .connect(uri, conectionParams)
  .then(() => console.log("Connected to cloud atlas"))
  .catch( (err) => 
  console.log(err));
  
  module.exports = connexion;