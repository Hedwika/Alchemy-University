const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const Contract = await hre.ethers.getContractFactory("Forwarder");
  // const targetAddress = '0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502';
  const contract = await Contract.deploy();
  
  console.log(`Contract was deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});