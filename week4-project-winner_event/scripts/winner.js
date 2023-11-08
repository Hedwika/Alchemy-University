const { ethers } = require("ethers");
const hre = require("hardhat");
const CONTRACT_ADDRESS = "0x495fb606879DFFCc1Ae8339997d72789979d1397";
contractABI = [
    {
      "inputs": [],
      "name": "callAttempt",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

async function main() {
    const provider = ethers.provider;
    const alchemyProvider = new ethers.JsonRpcProvider(
        process.env.GOERLI_URL
      );
    console.log("provider: ", alchemyProvider);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, alchemyProvider);
    console.log("wallet: ", wallet);
  
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);
  
    try {
      const tx = await contract.callAttempt();
      await tx.wait();
      console.log("Attempt function called successfully.");
    } catch (error) {
      console.error("Error calling the function:", error);
    }
  }

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
