// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.9;

// import "@openzeppelin/contracts@4.8.3/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts@4.8.3/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts@4.8.3/access/Ownable.sol";
// import "@openzeppelin/contracts@4.8.3/utils/Counters.sol";

// contract MyToken is ERC721, ERC721URIStorage, Ownable {
//     using Counters for Counters.Counter;

//     Counters.Counter private _tokenIdCounter;

//     constructor() ERC721("MyToken", "MTK") {}

//     function safeMint(address to, string memory  _tokrnURI) public onlyOwner {
//         _tokenIdCounter.increment();
//         _safeMint(to, _tokenIdCounter.current());
//        _setTokenURI(_tokenIdCounter.current(),  _tokrnURI);
//     }

//     // The following functions are overrides required by Solidity.

//     function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
//         super._burn(tokenId);
//     }

//     function tokenURI(uint256 tokenId)
//         public
//         view
//         override(ERC721, ERC721URIStorage)
//         returns (string memory)
//     {
//         return super.tokenURI(tokenId);
//     }
// }
