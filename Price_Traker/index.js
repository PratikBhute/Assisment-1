const price = require("crypto-price");

const express = require("express");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

 app.set("views".at, "ejs");


app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/getprice", (req, res) => {
  price
    .getCryptoPrice(req.body.currency, req.body.crypto )
    .then((result) => {
      console.log(result);
      res.json({
        price:result.price
      })
    })
    .catch((err) => {
      console.log(err);
      res.json({
        price:"error"
      })
    });
});

app.listen(5000, ()=>{
	console.log("Server started on port 5000,  http://localhost:5000");
})


//Run command : npm start
