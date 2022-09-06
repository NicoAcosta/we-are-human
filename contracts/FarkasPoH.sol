// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./IProofOfHumanity.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./IFarkasPoH.sol";

contract FarkasPoH is ERC721, IFarkasPoH {
    using Counters for Counters.Counter;

    event Donation(address indexed human, uint256 tokenId, uint256 amount);

    Counters.Counter private _tokenIds;
    IProofOfHumanity immutable proofOfHumanity;

    address payable public ubiBurner;
    address payable public farkas;
    address payable public immutable v4len;
    address payable public immutable nico;
    address payable public immutable front;

    mapping(address => bool) private _alreadyMinted;

    // tokenId => binary rarity
    mapping(uint256 => bool) private _rarity;

    constructor(
        address _proofOfHumanity,
        address _ubiBurner,
        address _farkas,
        address _v4len,
        address _nico,
        address _front
    ) ERC721("Farkas PoH", "FPoH") {
        proofOfHumanity = IProofOfHumanity(_proofOfHumanity);

        ubiBurner = payable(_ubiBurner);
        farkas = payable(_farkas);
        v4len = payable(_v4len);
        nico = payable(_nico);
        front = payable(_front);
    }

    function isRegistered(address human) public view returns (bool) {
        return proofOfHumanity.isRegistered(human);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function alreadyMinted(address human) public view returns (bool) {
        return _alreadyMinted[human];
    }

    function mint() public payable {
        require(isRegistered(msg.sender), "Not human");
        require(!alreadyMinted(msg.sender), "Human already minted NFT");

        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        _rarity[tokenId] = _randomRarity();
        _safeMint(msg.sender, tokenId);

        _alreadyMinted[msg.sender] = true;

        if (msg.value > 0) emit Donation(msg.sender, tokenId, msg.value);
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

    function withdrawETH() external {
        uint256 balance = address(this).balance;

        farkas.transfer((balance * 75) / 1000); // 7.5 %
        v4len.transfer((balance * 75) / 1000); // 7.5 %
        nico.transfer((balance * 10) / 100); // 10 %
        front.transfer((balance * 10) / 100); // 10 %

        ubiBurner.transfer(address(this).balance); // 65 %
    }
}
