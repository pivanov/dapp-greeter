"use strict";
exports.__esModule = true;
var ethers_1 = require("ethers");
var provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
console.log(provider);
