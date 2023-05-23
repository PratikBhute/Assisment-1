
const express =require("express");
const app = express();
const port = process.env.PORT || 3000;
require('./db/connection');
const path =require("path");
const hbs =require("hbs");
const Register = require("./models/register");
const { log } = require("console");

//for statically show the html page on browser
const static_path = path.join(__dirname, "../public" );
const template_path = path.join(__dirname, "../templates/views" );
const partials_path = path.join(__dirname, "../templates/partials" );


// console.log(path.join(path.join(__dirname, "../templates/views" ) ))

app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path)

app.get('/', (req,res) => {
   res.render("index")
})
app.get('/register', (req,res) => {
    res.render("register")
 })

app.get('/login', (req,res) => {
    res.render("login")
 })

 app.post('/register', async(req,res) => {
  try {
    const password = req.body.password
    const cpassword= req.body.confirmpassword
    if(password === cpassword){
        const resister = new Register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            gender:req.body.gender,
            phone:req.body.phone,
            age: req.body.age,
            password:password,
            confirmpassword:cpassword
        })
        const registered =await resister.save();
       // res.json(registered)
       res.status(200).render("login");

    }else{
        res.send("Password are not matching, please try again")
    }
    
  } catch (error) {
    res.status(400).send(error)
  }
 })

//  for login page
app.post('/login',async (req,res) => {
   try {
    const email =req.body.email;
    const password =req.body.password;

    const useremail = await Register.findOne({email:email})
    // res.send(useremail.password);
    // console.log(useremail)
    if(useremail.password === password){

        res.status(200).render("index");
    }else{
        res.status(400).send("Invalad Credentials, Please try again")
    }





   } catch (error) {
    res.status(400).send("Invalid Cerdentials")
   }
 })


app.listen(port, () => {
    console.log(`server is running on port no ${port}`)
})

