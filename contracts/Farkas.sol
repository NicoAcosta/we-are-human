// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./IProofOfHumanity.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FarkasPoH is ERC721 {
    using Counters for Counters.Counter;

    event Donation(address indexed human, uint256 amount);

    Counters.Counter private _tokenIds;
    IProofOfHumanity immutable proofOfHumanity;

    mapping(address => bool) private _alreadyMinted;

    // tokenId => binary rarity
    mapping(uint256 => bool) private _rarity;

    constructor(address _proofOfHumanity) ERC721("Farkas PoH", "FPoH") {
        proofOfHumanity = IProofOfHumanity(_proofOfHumanity);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function alreadyMinted(address human) public view returns (bool) {
        return _alreadyMinted[human];
    }

    function mint() public payable {
        require(proofOfHumanity.isRegistered(msg.sender), "Not human");
        require(!alreadyMinted(msg.sender), "Human already minted NFT");

        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        _rarity[tokenId] = _randomRarity();
        _safeMint(msg.sender, tokenId);

        if (msg.value > 0) emit Donation(msg.sender, msg.value);
    }

    function _randomRarity() private view returns (bool) {
        uint256 n = uint256(
            keccak256(
                abi.encodePacked(
                    blockhash(block.number),
                    block.timestamp,
                    msg.sender
                )
            )
        ) % 2;
        if (n == 0) return false;
        if (n == 1) return true;
        revert("No deberia llegar aca");
    }

    function contractURI() public pure returns (string memory) {
        return "contractipfs";
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "Token id does not exist");

        if (_rarity[tokenId]) return "ipfs1";
        return "ipfs0";
    }
}
