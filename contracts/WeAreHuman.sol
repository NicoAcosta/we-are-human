// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./interfaces/IProofOfHumanity.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./interfaces/IWeAreHuman.sol";
import "./Levels.sol";

error LevelOutOfBounds(Level level);
error InvalidETHReceived(uint256 expected, uint256 received);

contract WeAreHuman is ERC721, IWeAreHuman {
    using Counters for Counters.Counter;
    using Strings for uint256;

    event Donation(address indexed human, uint256 tokenId, uint256 amount);

    event Minted(
        address indexed human,
        uint256 tokenId,
        bool rarity,
        Level level
    );

    Counters.Counter private _tokenIds;
    IProofOfHumanity public proofOfHumanity;

    address payable public ubiBurner;
    address payable public immutable v4len;
    address payable public immutable nico;
    address payable public immutable front;

    mapping(address => bool) private _alreadyMinted;

    // tokenId => binary rarity
    mapping(uint256 => bool) private _rarities;

    // tokenId => Level enum
    mapping(uint256 => Level) private _levels;

    modifier validToken(uint256 tokenId) {
        require(_exists(tokenId), "Token does not exist");
        _;
    }

    constructor(
        address _proofOfHumanity,
        address _ubiBurner,
        address _v4len,
        address _nico,
        address _front
    ) ERC721("We Are Human", "WAH") {
        proofOfHumanity = IProofOfHumanity(_proofOfHumanity);

        ubiBurner = payable(_ubiBurner);
        v4len = payable(_v4len);
        nico = payable(_nico);
        front = payable(_front);
    }

    function isRegistered(address human) public view returns (bool) {
        return proofOfHumanity.isRegistered(human);
    }

    function totalSupply() external view returns (uint256) {
        return _tokenIds.current();
    }

    function alreadyMinted(address human) external view returns (bool) {
        return _alreadyMinted[human];
    }

    function rarityOf(
        uint256 tokenId
    ) external view validToken(tokenId) returns (string memory) {
        return _rarityToString(_rarities[tokenId]);
    }

    function levelOf(
        uint256 tokenId
    ) external view validToken(tokenId) returns (Level) {
        return _levels[tokenId];
    }

    function mint(Level _level) external payable {
        require(isRegistered(msg.sender), "Not human");
        require(!_alreadyMinted[msg.sender], "Human already minted NFT");

        uint256 _levelDonation = mintingDonation(_level);
        if (msg.value != _levelDonation)
            revert InvalidETHReceived(_levelDonation, msg.value);

        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        bool _rarity = _randomishRarity();

        _rarities[tokenId] = _rarity;
        _levels[tokenId] = _level;

        _safeMint(msg.sender, tokenId);

        _alreadyMinted[msg.sender] = true;

        emit Minted(msg.sender, tokenId, _rarity, _level);

        if (msg.value > 0) emit Donation(msg.sender, tokenId, msg.value);
    }

    function mintingDonation(Level _level) public pure returns (uint256) {
        if (_level == Level.LEVEL_1) return 0.01 ether;
        if (_level == Level.LEVEL_2) return 0.1 ether;
        if (_level == Level.LEVEL_3) return 1 ether;

        revert LevelOutOfBounds(_level);
    }

    function _randomishRarity() private view returns (bool) {
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

        // remove post testing
        revert("No deberia llegar aca");
    }

    function contractURI() external pure returns (string memory) {
        return string(abi.encodePacked(_baseURI(), "collection.json"));
    }

    function _rarityToString(
        bool _rarity
    ) private pure returns (string memory) {
        return _rarity ? "earth" : "moon";
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://ipfs.io/ipfs/bafybeidiy45jzm4dcx3wd2n4iqyfp6kpqzgqql3quoqf5ccu7lqxro2lpi/";
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(_exists(tokenId), "Token id does not exist");

        string memory _rarity = _rarityToString(_rarities[tokenId]);
        string memory _level = uint256(_levels[tokenId]).toString();

        // return
        //     string(abi.encodePacked(_baseURI(), _rarity, "/", _level, ".json"));
        return string(abi.encodePacked(_baseURI(), _rarity, ".json"));
    }

    function withdrawETH() external {
        uint256 balance = address(this).balance;

        require(balance > 0, "No balance to withdraw");

        v4len.transfer((balance * 75) / 1000); // 7.5 %
        nico.transfer((balance * 10) / 100); // 10 %
        front.transfer((balance * 10) / 100); // 10 %

        ubiBurner.transfer(address(this).balance); // 65 %
    }
}
