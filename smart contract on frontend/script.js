// // connect to the Ethereum network
// const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

// const contractAddress = "0x083737156dff901207124887463136A482c8182b";
// const contractABI = [
//   {
//     "inputs": [
//       {
//         "internalType": "int256",
//         "name": "amt",
//         "type": "int256"
//       }
//     ],
//     "name": "deposite_money",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "int256",
//         "name": "amt",
//         "type": "int256"
//       }
//     ],
//     "name": "withdraw",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "getBalance",
//     "outputs": [
//       {
//         "internalType": "int256",
//         "name": "",
//         "type": "int256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ];

// async function connect() {
//   if (typeof web3 !== 'undefined') {
//     window.web3 = new Web3(Web3.currentProvider);
//   } else {
//     window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//   }

//   if (!web3.isConnected()) {
//     console.log('not-connected');
//   } else {
//     console.log('connected');
//   }
// }

// const bankContract = new web3.eth.Contract(contractABI, contractAddress);

// displayBalance();

// // get the balance and display it on the page
 
// function deposite(){
//     var inputval = document.getElementById("amount").value;
//     eth.getAccounts().then(function(account){
//         return bankContract.methods.deposite_money(inputval).send({from:account[0]});
//      }).then(function(tmp){
//         $("#amount").val("");
//         displayBalance();
//      }).catch(function(tmp){
//         alert(tmp);
//      })
// }

// function withdraw(){
//     var inputval = document.getElementById("amount").value;
//     eth.getAccounts().then(function(account){
//         return bankContract.methods.withdraw(inputval).send({from:account[0]});
//      }).then(function(tmp){
//         $('#amount').val("");
//         displayBalance();
//      }).catch(function(tmp){
//         alert(tmp);
//      })
// }

//     // get the balance and display it on the page
// async function displayBalance() {
//     const balance = await bankContract.methods.getBalance().call();
//     document.getElementById("balance").innerHTML = balance;
// }
