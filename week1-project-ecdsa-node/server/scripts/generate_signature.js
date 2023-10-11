const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { toHex, bytesToHex } = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "f946eb1ba3c838135ff1d9c37fde09e87df3d33992a5d46927bf03d2bdf0f8c5";
const message = "I prove this is my address.";

const msg_hashed = keccak256(Uint8Array.from(utf8ToBytes(message)));
console.log("hashed message: ", msg_hashed);

async function signature() {
    secp.sign(msg_hashed, PRIVATE_KEY, { recovered: true })
  .then(signature => {
    console.log(signature);
    return signature;
  })
  .catch(error => {
    console.error("Error:", error);
  });
}

signature();