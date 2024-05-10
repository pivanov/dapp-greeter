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

    function testInitialGreeting() public view {
        // This test should check the personalized greeting retrieval
        string memory retrievedGreeting = greeter.greet();
        assertEq(retrievedGreeting, initialGreeting); // This assumes the sender has set the initial greeting
    }

    function testSetGreeting() public {
        string memory newGreeting = "Hello, Foundry!";
        greeter.setGreeting(newGreeting);
        assertEq(greeter.greet(), newGreeting); // Check if the new greeting is set correctly
        uint256 userCount = counter.getCount(address(this)); // Check the interaction with Counter
        assertEq(userCount, 1); // Should be 1 as this is the first time setting greeting in this test
    }
}
