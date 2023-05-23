// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


/**
 * @title Owner
 * @dev Set & change owner
 */
contract myCalculator{

function multiplyCalculator(uint a, uint b) public pure returns(uint) 
{
    uint result = a * b;
    return result;
}
function divideCalculator(uint a, uint b) public pure returns(uint) 
{
    uint result = a /  b;
    return result;
}

}