# Winner event
## Task
🏁 Your Goal: Emit the Winner event
Your goal is simple! Emit the winner event on this smart contract on the Goerli testnet: https://goerli.etherscan.io/address/0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502#code

## My solution
Environment setup:
1) `npm init -y`
2) `npm i hardhat`
3) `npx hardhat`

Steps:
After following video tutorial from Dan, I repeated his steps simillary:
1) Created Forwarder.sol contract
2) `npx hardhat compile`
3) Edited deploy.js
4) `npm i dotenv`
5) `npx hardhat run scripts/deploy.js --network goerli`
5) Created winner.js
6) `npx hardhat run scripts/winner.js --network goerli`