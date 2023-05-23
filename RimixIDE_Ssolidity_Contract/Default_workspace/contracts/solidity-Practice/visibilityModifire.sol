// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


 contract visibility{
     uint private data=10;    //state variable
    
     function x() private pure returns(uint){
         uint newdata=15;
         return newdata;
     }
     function y() public view returns(uint){
      
         return data;
     }
 }