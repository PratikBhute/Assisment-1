const price = require("crypto-price");
price
  .getCryptoPrice('USD', 'BTC')
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
