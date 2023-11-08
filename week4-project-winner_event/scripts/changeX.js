const hre = require("hardhat");
const CONTRACT_ADDRESS = "0x9AdA73B3135BE2B3B24F91B5540F5F6203829430";

async function main() {
  const contract = await hre.ethers.getContractAt("Contract", CONTRACT_ADDRESS);

  const tx = await contract.changeX(41);
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exit(1); 
});
