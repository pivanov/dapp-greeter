// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Greeter} from "../src/Greeter.sol";
import {Counter} from "../src/Counter.sol"; // Make sure to import the Counter contract

contract GreeterTest is Test {
    Greeter greeter;
    Counter counter; // Include a Counter instance
    string initialGreeting = "Hello, from Greeter!"; // Adjust based on default behavior

    function setUp() public {
        counter = new Counter(); // Deploy a new Counter
        greeter = new Greeter(initialGreeting, address(counter)); // Pass Counter address to Greeter
    }

    function test_InitialGreeting() public view {
        string memory retrievedGreeting = greeter.greet();
        assertEq(retrievedGreeting, initialGreeting);
    }

    function test_SetGreeting() public {
        string memory newGreeting = "Hello, Foundry!";

        greeter.setGreeting(newGreeting);
        assertEq(greeter.greet(), newGreeting);

        uint256 userCount = counter.getCount(address(this));
        assertEq(userCount, 1);
    }

    function test_GetCount() public view {
        uint256 count = greeter.getCount();
        assertEq(count, 0);
    }

    function test_GetMessageCount() public {
        uint256 messageCount = greeter.getMessageCount();
        assertEq(messageCount, 0);
    }
}
