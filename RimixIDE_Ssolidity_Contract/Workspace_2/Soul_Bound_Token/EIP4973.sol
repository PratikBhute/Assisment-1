//SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 < 0.9.0;

//import {ERC} from "./ERC165.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {IERC721Metadata} from "./IERC721Metadata.sol";
import {IERC4973} from "./IERC4973.sol";


abstract contract ERC4973 is ERC165 , IERC721Metadata, IERC4973 {
    string private _name;
    string private _symbol;

    mapping(uint256 => address) private _owners;
    mapping(uint256 => string) private _tokenURIs;

    constructor(
        string memory name_,
        string memory symbol_
    ) {
        _name = name_ ;
        _symbol = symbol_ ;
    }
    
    

    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
    return
         interfaceId == type(ERC165).interfaceId;
        interfaceId == type(IERC721Metadata).interfaceId ||
        interfaceId == type(IERC4973).interfaceId ||
        super.supportInterface(interfaceId);
}


    function name () public view virtual override returns (string memory){
    return _name;
    }
    
}