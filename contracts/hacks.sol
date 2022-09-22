// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Hackerverse is ERC721, ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 public fees;


    constructor(
        uint256 fees_
    ) ERC721("Hackerverse", "HACKS"){
        fees = fees_;
    }

    // Allow a user to mint a hack 
    function mintHack(address to, string memory uri) public payable {

        require(msg.value >= fees, "Not enough MATIC");
        require(balanceOf(msg.sender) <= 1, "You already minted/entered a hack");
        payable(owner()).transfer(fees);

        //Mint NFT

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        //Return oversupplied fees

        uint256 contractBalance = address(this).balance;

        if (contractBalance > 0) {
            payable(msg.sender).transfer(address(this).balance);
        }
    }

    // Allow a user that owns a hack, to edit the hack
    function editHack(uint256 tokenId, string memory uri) public {
        require(ownerOf(tokenId) == msg.sender, "You do not own this project");
        _setTokenURI(tokenId, uri);
    }

    // Change Fee 
    function changeFee(uint256 _newfees) public onlyOwner {
        fees = _newfees;
    }

    // ... You never know. 
    function withdraw() public onlyOwner {
		uint256 balance = address(this).balance;
		payable(msg.sender).transfer(balance);
	}

    // Override Functions

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }


}