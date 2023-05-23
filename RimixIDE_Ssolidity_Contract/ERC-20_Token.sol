// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract MyToken {
    string public name = "MyToken";
    string public symbol = "MYT";
    uint8 public decimals = 18;
    uint256 public totalSupply = 100000 * (10 ** decimals);

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

     event Transfer(address indexed _from, address indexed _to, uint256 _value);
     event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    constructor() {
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balanceOf[msg.sender] >= _value, "Not Enough tokens to transfer.");
       // balanceOf[msg.sender] -= _value;   ------balance is dudected from sender account 
        balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
       // balanceOf[_to] += _value;          ------balance is credited to another account
        balanceOf[_to] = balanceOf[_to] + _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(allowance[_from][msg.sender] >= _value, "Not approved to transfer");
        require(balanceOf[_from] >= _value, "Not enough tokens to transfer");

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
       
    }
    function approve(address _spender, uint256 _value) public returns (bool success){
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); 
        return true;
    }
}