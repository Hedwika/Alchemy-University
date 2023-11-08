const hre = require("hardhat");
const CONTRACT_ADDRESS = "0x62F9ad529Cd57C5eB005aF7aaABfce4C494B6c39";

async function main() {
  const contract = await hre.ethers.getContractAt("Contract", CONTRACT_ADDRESS);
  
  xValue = await contract.x();
  console.log(xValue);
}

main().catch((error) => {
  console.error(error);
  process.exit(1); 
});
