const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const Blockchain = require('./blockchain');
const { v1: uuidv1 } = require('uuid');
const port = process.argv[2];
const rp = require('request-promise');
const nodeAddress = uuidv1()?.split('-').join('');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const bitcoin = new Blockchain();

//GET whole blockchain endpoint
app.get('/blockchain', function (req, res) {
  res.send(bitcoin);
});


// ADD Transaction endpoint
app.post('/transaction', function(req, res) {
	// the server extracts the transaction details from the request body create a new transaction
	// with the help of addTransactionToPendingTransactions()
	const newTransaction = req.body;
	const blockIndex = bitcoin.addTransactionToPendingTransactions(newTransaction);
	res.json({ note: `Transaction will be added in block ${blockIndex}.` });
});

// broadcast the transaction to all network node URLs
app.post('/transaction/broadcast', function(req, res) {
	// When a POST request is received, the server extracts the transaction
	// details from the request body and creates a new transaction using the createNewTransaction() 
	const newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);

	// server broadcasts the transaction to all network nodes in the blockchain network.
	bitcoin.addTransactionToPendingTransactions(newTransaction);
	const requestPromises = [];
	bitcoin	.networkNodes.forEach(networkNodeUrl => {
//iterating through all network node URLs in the 'networkNodes' array 
		const requestOptions = {
			//sending a POST request to the endpoint of each node
			uri: networkNodeUrl + '/transaction', 
			method: 'POST',
			body: newTransaction,
			json: true
		};
		//the request is sent using the request-promise library.
		requestPromises.push(rp(requestOptions));
	});
//route handler waiting for all request promises to resolve using the Promise.all() method
	Promise.all(requestPromises)
	.then(data => {
		res.json({ note: 'Transaction created and broadcast successfully.' });
	});
});


//GET mine endpoint
//When a GET request is received, the server creates a new block in the blockchain
app.get('/mine', function(req, res) {
	const lastBlock = bitcoin.getLastBlock();
	const previousBlockHash = lastBlock['hash'];
	
	const currentBlockData = {
		transactions: bitcoin.pendingTransactions,
		index: lastBlock['index'] + 1
	};
	const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
	const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
	const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
	const requestPromises = [];
	bitcoin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/receive-new-block',
			method: 'POST',
			body: { newBlock: newBlock },
			json: true
		};
		//the request is sent using the request-promise library.
		requestPromises.push(rp(requestOptions));
	});
//route handler waiting for all request promises to resolve using the Pro.almisel() method
	Promise.all(requestPromises)
	.then(data => {
		const requestOptions = {
			uri: bitcoin.currentNodeUrl + '/transaction/broadcast',
			method: 'POST',
			body: {
				// reward the miner for successfully mining the block
				amount: 12.5,
				sender: "00",
				recipient: nodeAddress
			},
			json: true
		};
		return rp(requestOptions);
	})
	.then(data => {
		res.json({
			note: "New block mined & broadcast successfully",
			block: newBlock
		});
	});
});


// receive new block
app.post('/receive-new-block', function(req, res) {
	const newBlock = req.body.newBlock;
	const lastBlock = bitcoin.getLastBlock();
	const correctHash = lastBlock.hash === newBlock.previousBlockHash; 
	const correctIndex = lastBlock['index'] + 1 === newBlock['index'];
// If both of these conditions are true, the new block is added to the blockchain
	if (correctHash && correctIndex) {
		bitcoin.chain.push(newBlock);
		bitcoin.pendingTransactions = [];
		res.json({
			note: 'New block received and accepted.',
			newBlock: newBlock
		});
	} else {
		res.json({
			note: 'New block rejected.',
			newBlock: newBlock
		});
	}
});

//This endpoint is used to register and broadcast a new node to the network.
app.post('/register-and-broadcast-node', function(req, res) {
	//The function extracts the URL of the new node from the request body.
	const newNodeUrl = req.body.newNodeUrl;
	//The condition checks if the new node's URL is already in the list of network nodes.
	// If it is not, it adds the new node's URL to the list.
	if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) 
	  bitcoin.networkNodes.push(newNodeUrl);

	const regNodesPromises = [];
	bitcoin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/register-node',
			method: 'POST',
			body: { newNodeUrl: newNodeUrl },
			json: true	
		};
		regNodesPromises.push(rp(requestOptions));
	});
	//Promise.all(regNodesPromises) to waiting for all the registration requests to finish,
	Promise.all(regNodesPromises)
	.then(data => {
		const bulkRegisterOptions = {
			uri: newNodeUrl + '/register-nodes-bulk',
			method: 'POST',
			// The request body includes an array of all the network nodes
			body: { allNetworkNodes: [ ...bitcoin.networkNodes, bitcoin.currentNodeUrl ] },
			json: true
		};
	//the bulk registration request to the new node using request promise
		return rp(bulkRegisterOptions);
	})
	.then(data => {
		res.json({ note: 'New node registered with network successfully.' });
	});
});

// register a node with the network
app.post('/register-node', function(req, res) {
	const newNodeUrl = req.body.newNodeUrl;
	//The function checks if the new node's URL is already in the list of network nodes.
	const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
	const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
	if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);
	res.json({ note: 'New node registered successfully.' });
});


// register multiple nodes at once
app.post('/register-nodes-bulk', function(req, res) {
	const allNetworkNodes = req.body.allNetworkNodes;
	allNetworkNodes.forEach(networkNodeUrl => {
		const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
		const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
		//If the new node is not already present in the network and it is not the current node
		if (nodeNotAlreadyPresent && notCurrentNode)
		// the function adds the new node's URL to the list of network nodes.
		 bitcoin.networkNodes.push(networkNodeUrl);
	});
	res.json({ note: 'Bulk registration successful.' });
});


//This endpoint that implements the consensus algorithm in a blockchain network.
app.get('/consensus', function(req, res) {
	const requestPromises = []; // hold the promises returned by each node's /blockchain GET request.
	bitcoin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/blockchain', 
			method: 'GET',	// for each node, creates a requestOptions object to make a GET request
			json: true
		};	 
		//  pushes the returned promise into the requestPromises array.
		requestPromises.push(rp(requestOptions));
	});
	Promise.all(requestPromises)  //Waits for all the promises in the requestPromises array
	.then(blockchains => {
		const currentChainLength = bitcoin.chain.length;
		let maxChainLength = currentChainLength;
		let newLongestChain = null;
		let newPendingTransactions = null;
		blockchains.forEach(blockchain => {
		//checks if its length is greater than the maxChainLength.  
			if (blockchain.chain.length > maxChainLength) {
				maxChainLength = blockchain.chain.length;
				//If it is assigns the blockchain to newLongestChain,
				newLongestChain = blockchain.chain;
				//assigns  pending transactions to newPendingTransactions.
				newPendingTransactions = blockchain.pendingTransactions;
			};
		});
			//Checks if there is no new longest chain or the new longest chain is invalid
		if (!newLongestChain || (newLongestChain && !bitcoin.chainIsValid(newLongestChain))) {
			res.json({
				// If condition is true, responds with the current node's blockchain and a note indicating that the current chain has not been replaced.
				note: 'Current chain has not been replaced.',
				chain: bitcoin.chain
			});
		}
		else {
			//else assigns newLongestChain to the current node's blockchain 
			bitcoin.chain = newLongestChain;
			//newPendingTransactions assigns to the current node's pending transactions
			bitcoin.pendingTransactions = newPendingTransactions;
			res.json({
				note: 'This chain has been replaced.',
				chain: bitcoin.chain
			});
		}
	});
});

// get block by blockHash
app.get('/block/:blockHash', function(req, res) { 
	const blockHash = req.params.blockHash;
	const correctBlock = bitcoin.getBlock(blockHash);
	res.json({
		block: correctBlock
	});
});

//GET transcation by tranaction Id
app.get('/transaction/:transactionId', function(req, res) {
	const transactionId = req.params.transactionId;
	const trasactionData = bitcoin.getTransaction(transactionId);
	res.json({
		transaction: trasactionData.transaction,
		block: trasactionData.block
	});
});


app.get('/address/:address', function(req, res) {
	const address = req.params.address;
	const addressData = bitcoin.getAddressData(address);
	res.json({
		addressData: addressData
	});
});

// block explorer
app.get('/block-explorer', function(req, res) {
	res.sendFile('./block-explorer/index.html', { root: __dirname });
});




// Port
app.listen(port, function () {
	console.log(`Listning on port ${port}.....!!`)
});