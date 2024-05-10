// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { console } from "forge-std/console.sol";
import "./Counter.sol";  // Ensure the Counter contract is in the same directory or adjust the path accordingly

contract Greeter {
    mapping(address => string) private greetings;
    Counter private counter;  // Instance of the Counter contract

    event GreetingUpdated(address indexed user, string oldGreeting, string newGreeting);
    event CountRetrieved(address indexed user, uint256 count);

    constructor(string memory _greeting, address _counterAddress) {
        console.log("@@@ Deploying a Greeter with default greeting:", _greeting);
        greetings[msg.sender] = _greeting;
        counter = Counter(_counterAddress);  // Initialize Counter contract
    }

    function greet() public view returns (string memory) {
        string memory userGreeting = greetings[msg.sender];
        console.log("2. Greeter for %s", msg.sender);
        if (bytes(userGreeting).length == 0) {
            return "Hello, from Greeter!";
        }
        return userGreeting;
    }

    function setGreeting(string memory _greeting) public {
        require(bytes(_greeting).length > 0, "Greeting cannot be empty");

        // Log the current and new greeting values for debugging
        console.log("Current greeting for %s: %s", msg.sender, greetings[msg.sender]);
        console.log("New greeting: %s", _greeting);

        emit GreetingUpdated(msg.sender, greetings[msg.sender], _greeting);

        // Assign the new greeting value
        greetings[msg.sender] = _greeting;

        console.log("NEW NEW NEW greeting: %s", greetings[msg.sender]);
        console.log("1. Greeter for %s", msg.sender);

        // Increment count and emit event
        counter.incrementCount(msg.sender);
    }


    function getCount() public view returns (uint256) {
        require(msg.sender != address(this), "Caller cannot be the contract itself");
        return counter.getCount(msg.sender);
    }

    function getMessageCount() public returns (uint256) {
        uint256 count = counter.getCount(msg.sender);
        emit CountRetrieved(msg.sender, count);
        return count;
    }
}
