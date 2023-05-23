//Discription:- Login with Web3 | Full stack, end to end tutorial on authenticating users with a Web3 Wallet
// youtube link -- https://www.youtube.com/watch?v=FE21fCEb4Yo&list=RDCMUCJbA7dA_YPbnef0vEBFuhKQ&start_radio=1&rv=FE21fCEb4Yo&t=1205



const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const Web3 = require("web3");

const web3 = new Web3("http://cloudflare-eth.com/");
const jwtSecret = "some very secret value";

app.use(express.static("public"));

app.get("/nonce", (req, res) => {
  const nonce = new Date().getTime();
  const address = req.query.address;
  const tempToken = jwt.sign({ nonce, address }, jwtSecret, {
    expiresIn: "60s",
  });
  const message = getSignMassage(address, nonce);

  res.json({ tempToken, message });
});

app.post("/verify", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const tempToken = authHeader && authHeader.split(" ")[1];

  if (tempToken === null) return res.sendStatus(403);
  const userData = await jwt.verify(tempToken, jwtSecret);
  const nonce = userData.nonce;
  const address = userData.address;
  const message = getSignMassage(address, nonce);
  const signature = req.query.signature;

  const varifiedAddress = await web3.eth.accounts.recover(message, signature);

  if (varifiedAddress.toLowerCase() == address.toLowerCase()) {
    const token = jwt.sign({ varifiedAddress }, jwtSecret, { expiresIn: "1d" });
    res.json({ token });
  } else {
    res.sendStatus(403);
  }
});

app.get('/secret', authenticateToke, async (req, res) => {
    res.send(`Welcome address ${req.authData.varifiedAddress}`)
})

function authenticateToke(req, res, next){
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, jwtSecret, (err, authData) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.authData = authData;
    next();
  });
};

const getSignMassage = (address, nonce) => {
  return `Please Sign this massage for address ${address}:\n\n ${nonce}`;
};

const server = app.listen(3000, (res) => {
  console.log(
    `Server is running at http://localhost:${server.address().port}/`
  );
});
