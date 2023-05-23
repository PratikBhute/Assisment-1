const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

const bc1 ={
    "chain": [
    {
    "index": 1,
    "timestamp": 1679316660619,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1679316789981,
    "transactions": [],
    "nonce": 18140,
    "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timestamp": 1679316839466,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "ddb85ea0c71d11ed88d0c78fc8326fd4",
    "transactionId": "2ae37750c71e11ed88d0c78fc8326fd4"
    },
    {
    "amount": 50,
    "sender": "PRATIK5SFDDF5V5DF",
    "recipient": "KARAN56DFGDDSDFDD43256"
    },
    {
    "amount": 60,
    "sender": "PRATIK5SFDDF5V5DF",
    "recipient": "KARAN56DFGDDSDFDD43256"
    },
    {
    "amount": 70,
    "sender": "PRATIK5SFDDF5V5DF",
    "recipient": "KARAN56DFGDDSDFDD43256"
    }
    ],
    "nonce": 30712,
    "hash": "00003539662777e0d6b14bee7bbb9f2e5f8fdf45d3b5c501c91ba9b8c2a5f7be",
    "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
    "index": 4,
    "timestamp": 1679316860866,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "ddb85ea0c71d11ed88d0c78fc8326fd4",
    "transactionId": "48537a10c71e11ed88d0c78fc8326fd4"
    },
    {
    "amount": 80,
    "sender": "PRATIK5SFDDF5V5DF",
    "recipient": "KARAN56DFGDDSDFDD43256"
    },
    {
    "amount": 90,
    "sender": "PRATIK5SFDDF5V5DF",
    "recipient": "KARAN56DFGDDSDFDD43256"
    },
    {
    "amount": 100,
    "sender": "PRATIK5SFDDF5V5DF",
    "recipient": "KARAN56DFGDDSDFDD43256"
    }
    ],
    "nonce": 54278,
    "hash": "0000515793953950a1c0635b7f984825dd8455818225a6107232f8473c0f12e5",
    "previousBlockHash": "00003539662777e0d6b14bee7bbb9f2e5f8fdf45d3b5c501c91ba9b8c2a5f7be"
    },
    {
    "index": 5,
    "timestamp": 1679316868025,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "ddb85ea0c71d11ed88d0c78fc8326fd4",
    "transactionId": "5514b480c71e11ed88d0c78fc8326fd4"
    }
    ],
    "nonce": 50009,
    "hash": "00006b5e22539eb7f0deca5452f0ef4384ddc8c89a61bb4093312dd9ec8eb4d5",
    "previousBlockHash": "0000515793953950a1c0635b7f984825dd8455818225a6107232f8473c0f12e5"
    }
    ],
    "pendingTransactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "ddb85ea0c71d11ed88d0c78fc8326fd4",
    "transactionId": "5958ede0c71e11ed88d0c78fc8326fd4"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    }

console.log( 'VALID: ', bitcoin.chainIsValid(bc1.chain));




// bitcoin.createNewBlock(56,'DFFB468F4VB6FVB', 'SDF48SD6G8SDF9G');
// bitcoin.createNewTransacation(15000,'PratikXV45DF4DFG5', 'Bhute54C54SDC4SD54F');


// bitcoin.createNewBlock(25555,'DF546F56G65FG', '85546V6V542V54DF54V');

// bitcoin.createNewTransacation(124,'KARAN5F546DFB5F56B', 'BHUTE56DV5D5V546DFVB');
// bitcoin.createNewTransacation(123,'ANKITFG6HFG5B54F654BH', 'KEWATEDF546VD6G54D546G');
// bitcoin.createNewTransacation(122,'JITESHD54VDF56V56DFF56', 'BINNERDF4D56V6DV');

// bitcoin.createNewBlock(555,'4SD48FSD8F8', 'D5G46DFSB63DFG3');
// bitcoin.createNewTransacation(123,'ANKITFG6HFG5B54F654BH', 'KEWATEDF546VD6G54D546G');
// bitcoin.createNewTransacation(122,'JITESHD54VDF56V56DFF56', 'BINNERDF4D56V6DV');
// bitcoin.createNewBlock(555,'4SD48FSD8F8', 'D5G46DFSB63DFG3');

// bitcoin.createNewTransacation(124,'KARAN5F546DFB5F56B', 'BHUTE56DV5D5V546DFVB');
// bitcoin.createNewTransacation(123,'ANKITFG6HFG5B54F654BH', 'KEWATEDF546VD6G54D546G');
// bitcoin.createNewTransacation(122,'JITESHD54VDF56V56DFF56', 'BINNERDF4D56V6DV');
// bitcoin.createNewTransacation(122,'JITESHD54VDF56V56DFF56', 'BINNERDF4D56V6DV');



// const priviousBlockHash = 'GR5GR5GRG5R7GR57GDFFS';
// const currentBlockData = [
//     {
//         amount: 120,
//         sender: 'D6F5G6D5G65DFG5',
//         recipient: '5V56FV5DFV56SS  '
//     },
//     {
//         amount: 20,
//         sender: '5V6VDF6V6V6',
//         recipient: '56F4FD656D6V54F564DGd  '
//     },
//     {
//         amount: 23,
//         sender: 'D54DV564465D6F54F6F46DEFS',
//         recipient: '56DFVD6VD56'
//     }

// ];
// console.log(bitcoin.hashBlock(priviousBlockHash, currentBlockData, 13203))




