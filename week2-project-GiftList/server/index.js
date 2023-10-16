const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// DONE: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = "14a063217458e0bf11435c89ad74d22074fe441c9bdaf3d4c9d6238d84c8cd90";

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { name, proof } = req.body;

  // DONE: prove that a name is in the list 
  let isInTheList = false;
  const verification = verifyProof(proof, name, MERKLE_ROOT);

  if (verification) {
    isInTheList = true;
  }

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
