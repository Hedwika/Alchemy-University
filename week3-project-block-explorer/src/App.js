import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);
const ethers = require('ethers');

function App() {
  const [blocks, setBlocks] = useState([
    {
      number: "Checking the block number for you!",
      transactions: [],
      gas: 0,
      transactionsInfo: []
    },
    {
      number: "Wait for it...",
      transactions: [],
      gas: 0,
      transactionsInfo: []
    },
  ]);
  const { ethers } = require('ethers');

  useEffect(() => {
    async function getBlock() {
      const newBlock = await alchemy.core.getBlock();
      const gasPrice = await alchemy.core.getGasPrice();

      if (newBlock.number !== blocks[0].number) {
        newBlock.gas = ethers.utils.formatUnits(gasPrice, 'gwei');
        setBlocks([newBlock, blocks[0]]);
      }

    }

    getBlock();
    const intervalId = setInterval(getBlock, 1000);

    return () => clearInterval(intervalId);
  });

  let gasCurrent;
  let gasPrevious;

  let formattedTimeCurrent;
  let formattedTimePrevious;

  for (let i = 0; i < blocks.length; i++) {
    const gas = blocks[i].gas

    const timestamp = blocks[i].timestamp;
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (i === 0) {
      gasCurrent = gas;
      formattedTimeCurrent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } else {
      gasPrevious = gas;
      formattedTimePrevious = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  }

  return (
    <div className="App">
      <div>
      <div style={{ marginBottom: "10px", marginTop: "20px"}}>
          <strong>Current block</strong>
        </div>
        <div>
          <strong>Number:</strong> {blocks[0].number}
        </div>
        <div>
          <strong>Transactions count:</strong> {blocks[0].transactions.length}
        </div>
        <div>
          <strong>Transactions count change:</strong> {blocks[0].transactions.length - blocks[1].transactions.length}
        </div>
        <div>
          <strong>Miner:</strong> {blocks[0].miner}
        </div>
        <div>
          <strong>Time:</strong> {formattedTimeCurrent}
        </div>
        <div>
          <strong>Gas:</strong> {gasCurrent}
        </div>
        <div>
          <strong>Gas change:</strong>{" "}
          <span style={{ color: blocks[0].gas - blocks[1].gas > 0 ? "red" : "green" }}>
            {blocks[0].gas - blocks[1].gas}
          </span>
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
        <div style={{ marginBottom: "10px" }}>
          <strong>Previous block</strong>
        </div>
        <div>
          <strong>Number:</strong> {blocks[1].number}
        </div>
        <div>
          <strong>Transactions count:</strong> {blocks[1].transactions.length}
        </div>
        <div>
          <strong>Miner:</strong> {blocks[1].miner}
        </div>
        <div>
          <strong>Time:</strong> {formattedTimePrevious}
        </div>
        <div>
          <strong>Gas:</strong> {gasPrevious}
        </div>
      </div>
    </div>
  );  
}

export default App;
