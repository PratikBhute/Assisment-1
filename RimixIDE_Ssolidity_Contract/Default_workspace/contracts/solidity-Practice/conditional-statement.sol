// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


 contract conditionalStatement{

      function checkNum(int num) public pure returns(string memory){

          if(num < 0){
              return "It is the negative number";
          }
          else if(num == 0){
              return "It is equal to zero";
          }
          else{
              return "it is positive number";
          }
      }
 }