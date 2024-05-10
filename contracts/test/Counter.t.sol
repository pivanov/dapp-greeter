// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Counter} from "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;
    address testUser = address(0x123); // Example test address

    function setUp() public {
        counter = new Counter();
        // Initialize count for the test user if necessary
        counter.incrementCount(testUser); // Start the count at 1 for simplicity
    }

    function test_IncrementCount() public {
        uint256 initialCount = counter.getCount(testUser);
        counter.incrementCount(testUser);
        uint256 newCount = counter.getCount(testUser);
        assertEq(newCount, initialCount + 1);
    }

    function test_IncrementCountByUser(address user) public {
        uint256 initialCount = counter.getCount(user);
        counter.incrementCount(user);
        assertEq(counter.getCount(user), initialCount + 1);
    }
}
