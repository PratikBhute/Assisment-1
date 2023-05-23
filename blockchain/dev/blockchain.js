module.exports = Blockchain;
const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const { v1: uuidv1 } = require('uuid');

//CREATE constructor function that creates a new instance of a blockchain object
function Blockchain() {
	this.chain = [];
	this.pendingTransactions = [];
	this.currentNodeUrl = currentNodeUrl;
	this.networkNodes = [];
	this.createNewBlock(100, '0', '0');
};
//CREATE NEW BLOCK METHOD
Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
	//object of new block
	const newBlock = {
		index: this.chain.length + 1,
		timestamp: Date.now(),
		transactions: this.pendingTransactions,
		nonce: nonce,
		hash: hash,
		previousBlockHash: previousBlockHash
	};
	this.pendingTransactions = [];
	this.chain.push(newBlock);
	return newBlock;
};

//GET LAST BLOCK method 
Blockchain.prototype.getLastBlock = function () {
	return this.chain[this.chain.length - 1];
};

//CREATE NEW TRANSCATION Method in the Blockchain prototype object with paramiters
Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
	//  create a new transaction object
	const newTransaction = {
		amount: amount,
		sender: sender,
		recipient: recipient,
		transactionId: uuidv1()?.split('-').join('')
	};
	return newTransaction;
};
//Add Transcation to a pending transcation
Blockchain.prototype.addTransactionToPendingTransactions = function (transactionObj) {
	this.pendingTransactions.push(transactionObj);
	return this.getLastBlock()['index'] + 1;           //return to the next block
};
//Method is responsible for calculating the hash of a given block in the blockchain.
Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
	const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
	const hash = sha256(dataAsString);			  //sha256() function is called to generate the hash  
	return hash;
};
// create the proof of work method which is responsible for finding a nonce value
Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
	let nonce = 0;
	//hash method is called with the arguments to generate an initial hash value.
	let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
	while (hash.substring(0, 4) !== '0000') {
		nonce++;
		hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
	}
	return nonce;		 //when the hash value start with four zeros is obtained, the function returns the value of nonce
};
// Check the chain is valid or not
Blockchain.prototype.chainIsValid = function (blockchain) {
	let validChain = true;
	//checking each block in chain
	for (var i = 1; i < blockchain.length; i++) {
		const currentBlock = blockchain[i];
		const prevBlock = blockchain[i - 1];
		const blockHash = this.hashBlock(prevBlock['hash'], { transactions: currentBlock['transactions'], index: currentBlock['index'] }, currentBlock['nonce']);
		if (blockHash.substring(0, 4) !== '0000') validChain = false;
		if (currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false;
	};
	//checking genisus block 
	const genesisBlock = blockchain[0];
	const correctNonce = genesisBlock['nonce'] === 100;
	const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
	const correctHash = genesisBlock['hash'] === '0';
	const correctTransactions = genesisBlock['transactions'].length === 0;
	if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;
	return validChain;
};

//Get a block in the blockchain by its hash value
Blockchain.prototype.getBlock = function(blockHash) {
	let correctBlock = null;
	this.chain.forEach(block => {
		if (block.hash === blockHash) correctBlock = block;
	});
	return correctBlock;
};
//GET transaction by using transaction Id
Blockchain.prototype.getTransaction = function(transactionId) {
	let correctTransaction = null;
	let correctBlock = null;

	this.chain.forEach(block => {
		block.transactions.forEach(transaction => {
			if (transaction.transactionId === transactionId) {
				correctTransaction = transaction;
				correctBlock = block;
			};
		});
	});

	return {
		transaction: correctTransaction,
		block: correctBlock
	};
};

//To retrieve transaction data related to a specific address.
Blockchain.prototype.getAddressData = function(address) {
	const addressTransactions = [];
	this.chain.forEach(block => {
		block.transactions.forEach(transaction => {
			if(transaction.sender === address || transaction.recipient === address) {
				addressTransactions.push(transaction);
			};
			
		});
	});

	let balance = 0;
	addressTransactions.forEach(transaction => {
		if (transaction.recipient === address) balance += transaction.amount;
		else if (transaction.sender === address) balance -= transaction.amount;
	});

	return {
		addressTransactions: addressTransactions,
		addressBalance: balance
	};
};
