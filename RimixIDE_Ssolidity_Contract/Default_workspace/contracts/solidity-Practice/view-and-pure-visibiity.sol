// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// View functions ensure that they will not modify the state (return values).
// Pure functions ensure that they not read or modify the state (return calculations).

contract MyContract {
    uint256 value;

    // getValue is a read only function that returns a value
    function getValue() external view returns (uint256) {
        // eth call
        // value = 2;
        return value;
    }

    function getNewValue() external pure returns (uint256) {
        // eth call
        // value = 2;
        return 3 + 3;
    }

    // setValue modifies the state value
    function setValue(uint256 _value) external {
        // eth send transaction
        value = _value;
    }

    function multiply() external pure returns (uint256) {
        return 3 * 7;
    }

    function valuePlusThree() external view returns (uint256) {
        return value + 3;
    }
}

/* 
Exercise: 
1. create a function called multiply which returns 3 multiplied by 7 
2. create another fuction called valuePlusThree which returns the state variable value + 3 
3. sucessfully deploy the contracts and test for the results.
***Remember*** to use the appropriate modifying keywords accordingly!!!!!!!
*/
