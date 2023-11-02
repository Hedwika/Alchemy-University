require("dotenv").config();
const ethers = require("ethers");

const contractABI = [{"inputs":[],"name":"count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dec","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inc","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    process.env.TEST_API_KEY
);

const wallet = new ethers.Wallet(
    process.env.TEST_PRIVATE_KEY,
    provider
);

async function main() {
    const counterContract = new ethers.Contract(
        "0x5F91eCd82b662D645b15Fd7D2e20E5e5701CCB7A",
        contractABI,
        wallet // for .get() is provider in here, for .inc() is wallet necessary
    )

    let currentCounterValue = await counterContract.get();
    console.log("Original value: ", currentCounterValue.toString())

    // const increasedCounterValue = await counterContract.inc();
    // console.log("Increased by 1. Tx hash: ", increasedCounterValue.hash)

    const decreasedCounterValue = await counterContract.dec();
    console.log("Decreased by 1. Tx hash: ", decreasedCounterValue.hash)
}

main();