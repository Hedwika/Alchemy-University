const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xb7192491c40488e9434577b4ba1a5f18e840ff84": 100,
  "0x54db802b37a51d3720e082622d3e3cd069a9be17": 50,
  "0x07b131f5ed9ec366e3ef844ebd17494770e4a2cd": 75,
};

const address_publicKey = {
  "0xb7192491c40488e9434577b4ba1a5f18e840ff84": "04e96be22f2fdb8b651f66313074b687cb14b2524fe35e5fdf54a2dde17a4cc52c4ac00c7e61c8927c86c112c5ff997cc0a31101ebc8c98b5319b8bd5e45c1311a",
  "0x54db802b37a51d3720e082622d3e3cd069a9be17": "044e4d495ac3020f582213df917435836a75af602cb7b007c79225432e12d05c862b2aa4c3bf5ff4906b8e0872c57696c61c0e17f9498e753f3edf6aab23475f9d",
  "0x07b131f5ed9ec366e3ef844ebd17494770e4a2cd": "0410a03f45c26de09c6225b75f7ad60855c1e6fd40da2f1553a8d6cbc7c93bc259ca0b8610fe03e8eb823633e5863c05e2b4c2f53ced98d29c4fdc2f40d745f369",
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get("/publicKey/:address", (req, res) => {
  const { address } = req.params;
  const this_address_public_key = address_publicKey[address] || 0;
  res.send({ this_address_public_key });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
