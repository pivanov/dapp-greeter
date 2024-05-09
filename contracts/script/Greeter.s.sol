// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Greeter.sol";  // Adjust the path as necessary

contract GreeterScript is Script {
    function run() external {
        vm.startBroadcast();

        string memory initialGreeting = "Hello, from Greeter!";
        Greeter greeter = new Greeter(initialGreeting);

        // Output the address of the deployed contract
        console.log("@@@ Deployed Greeter contract at:", address(greeter));

        vm.stopBroadcast();
    }
}
