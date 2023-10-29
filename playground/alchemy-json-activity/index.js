const axios = require('axios');

// copy-paste your URL provided in your Alchemy.com dashboard
const ALCHEMY_URL = "https://eth-goerli.g.alchemy.com/v2/7yrexRBD5SbQmV4YZJKiivti8-XwL9YD";

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getBalance",
  params: [
    "0xf6d4067BbC68b0d1675FB3F87BAC928a20E86ad9",
    "latest"
  ]
}).then((response) => {
  console.log(response.data.result);
});