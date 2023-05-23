console.log("Running")


const mongoose = require("mongoose");
const User = require("./User")

const url = 'mongodb://localhost/testdb';
mongoose.connect(url, {useNewParser: true} );
const  con = mongoose.connection

con.on('open', function(){
    console.log("Connected to mongodb");
})

// run();
// async function run(){
//     const user= new User({name:"Pratik", age: 24});
//     await user.save();
//     console.log(user)

// }
