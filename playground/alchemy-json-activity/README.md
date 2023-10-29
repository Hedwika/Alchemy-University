_Alchemy University tutorial_

## Create Project Structure
1) In your terminal, in the folder of your choice, run `mkdir alchemyu-json-activity && cd alchemyu-json-activity`
2) Run `npm init -y`
3) Run `npm install axios`
4) Run `touch index.js`
5) In the index.js file, copy-paste the following:

`const axios = require('axios');

// copy-paste your URL provided in your Alchemy.com dashboard
const ALCHEMY_URL = "";

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getBlockByNumber",
  params: [
    "0xb443", // block 46147
    false  // retrieve the full transaction object in transactions array
  ]
}).then((response) => {
  console.log(response.data.result);
});`

Notice, you'll need to copy-paste your Alchemy HTTPS endpoint - if you haven't already done so, check out this quick start guide for more in-depth instructions on setting up Alchemy.
Feel free to choose whichever network you like today, including mainnet, as we will only be structuring READ-only queries.

Try running it (remember to save the file!) by running `node index` - you should see the contents of mainnet block #46147 printed out on your console.
