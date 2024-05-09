// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";

import {Greeter} from "../src/Greeter.sol";

contract GreeterTest is Test {
    Greeter greeter;
    string initialGreeting = "Hello, world!";

    function setUp() public {
        greeter = new Greeter(initialGreeting);
    }

    function testInitialGreeting() public view {
        assertEq(greeter.greet(), initialGreeting);
    }

    function testSetGreeting() public {
        string memory newGreeting = "Hello, Foundry!";
        greeter.setGreeting(newGreeting);
        assertEq(greeter.greet(), newGreeting);
    }
}
