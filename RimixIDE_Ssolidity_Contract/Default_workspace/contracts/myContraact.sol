// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract bank {
    int bal;
    constructor() {
    bal = 0;
    } 
     function getBalance() public view returns(int){
        return bal;
    }

    function deposite_money(int amt) public{
        bal = bal + amt;
        getBalance();
    }

     function withdraw(int amt) public{
        bal = bal - amt;
        getBalance();
    }

    
}