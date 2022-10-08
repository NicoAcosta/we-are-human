// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IWeAreHuman is IERC721 {
    // event Donation(address indexed human, uint256 tokenId, uint256 amount);

    // returns if address is registered in Proof Of Humanity
    function isRegistered(address human) external view returns (bool);

    // returns if address has already minted We Are Human NFT
    function alreadyMinted(address human) external view returns (bool);

    // mint WeAreHuman NFT, optional ETH donation through msg.value
    function mint() external payable;

    /**
        function will
            1. verify sender is PoH Registered
            2. verify sender has not already minted NFT
            3. set random rarity
            4. mint NFT to sender
            5. register that sender has already minted NFT
            6. if ETH is received, emit Donation event
    **/

    // withdraw ETH to withdrawal addresses
    function withdrawETH() external;
}
