// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Forwarder {
    address private constant contractAddress = 0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502;

    string private constant contractABI = '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"Winner","type":"event"},{"inputs":[],"name":"attempt","outputs":[],"stateMutability":"nonpayable","type":"function"}]';

    constructor() payable {
        // Accept initial Goerli ETH during contract deployment
    }

    function callAttempt() external {
        (bool success, ) = contractAddress.call(abi.encodeWithSignature("attempt()"));
        require(success, "Call to attempt() failed");
    }
}
