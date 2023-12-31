const axios = require('axios');
const readline = require('readline');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  // DONE: how do we prove to the server we're on the nice list? 
  rl.question('Please enter your name: ', async (name) => {
    try {
      const index = niceList.findIndex(n => n === name);
      const merkleTree = new MerkleTree(niceList);
      const proof = merkleTree.getProof(index);

      const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        // DONE: add request body parameters here!
        name,
        proof
      });

      console.log({ gift });

    } catch (error) {
      console.error('An error occurred:', error.message);
    } finally {
      rl.close();
    }
  });
}

main();
