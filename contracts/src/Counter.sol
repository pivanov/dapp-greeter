// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    mapping(address => uint256) private counts;

    function getCount(address user) public view returns (uint256) {
        return counts[user];
    }

    function incrementCount(address user) public {
        counts[user]++;
    }
}
