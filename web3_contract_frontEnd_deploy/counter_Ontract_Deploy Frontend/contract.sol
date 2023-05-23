// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Counter{
    uint public count = 0;
    function increment() public returns(uint){
        count += 1;
        return count;
    }
     function decrement() public returns(uint){
        count -= 1;
        return count;
    }
}