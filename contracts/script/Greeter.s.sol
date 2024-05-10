// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Greeter.sol";  // Ensure this path is correct
import "../src/Counter.sol";  // Adjust the path as necessary

contract GreeterScript is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy the Counter contract first
        Counter counter = new Counter();
        console.log("@@@ Deployed Counter contract at:", address(counter));

        // Initialize Greeter with the default greeting and the address of the deployed Counter
        string memory initialGreeting = "Hello, from Greeter!";
        Greeter greeter = new Greeter(initialGreeting, address(counter));
        console.log("@@@ Deployed Greeter contract at:", address(greeter));

        vm.stopBroadcast();
    }
}
