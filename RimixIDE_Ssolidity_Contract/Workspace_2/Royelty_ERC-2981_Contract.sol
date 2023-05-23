// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";


contract MyToken is ERC721, ERC721Enumerable, Ownable {
    string public contractURI;
    uint96 royaltyFeesInBips;
    address royaltyReceiver;

    constructor(uint96 _royaltyFeesInBips, string memory _contractURI) ERC721("MyToken", "MTK") {
        royaltyFeesInBips = _royaltyFeesInBips;
        royaltyReceiver = owner();
        contractURI = _contractURI;
        // setRoyaltyInfo(msg.sender, _royaltyFeesInBips);
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function setRoyaltyInfo(address _receiver, uint96 _royaltyFeesInBips) public onlyOwner {
        royaltyReceiver = _receiver;
        royaltyFeesInBips = _royaltyFeesInBips;
    }

    function setContractURI(string calldata _contractURI) public onlyOwner {
        contractURI = _contractURI;
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function royaltyInfo(uint256 tokenId, uint256 _salePrice) external view returns (address receiver, uint256 royaltyAmount)
    {
        return (royaltyReceiver, calculateRoyalty(_salePrice));
    }

    function calculateRoyalty(uint256 _salePrice) view public returns (uint256) {
        return (_salePrice / 10000) * royaltyFeesInBips;
    }

    function supportsInterface(bytes4 interfaceId)
            public
            view
            override(ERC721, ERC721Enumerable)
            returns (bool)
    {
        return interfaceId == 0x2a55205a || super.supportsInterface(interfaceId);
    }



/*

owner - 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
address 1 - 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2



*/

}