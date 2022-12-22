// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IProofOfHumanity {
    function isRegistered(address addr) external view returns (bool);
}
