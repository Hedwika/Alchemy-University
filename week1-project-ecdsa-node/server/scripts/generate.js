const secp = require("ethereum-cryptography/secp256k1")
const { toHex } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak");

// Generate private key
const privateKey = secp.utils.randomPrivateKey();
const hexed_privateKey = toHex(privateKey);
console.log("Private key:", hexed_privateKey);

// Generate public key from private key
const publicKey = secp.getPublicKey(privateKey);
console.log("Public key:", publicKey);
const hexed_publicKey = toHex(publicKey);
console.log("Public key hexadecimal:", hexed_publicKey);

// Generate address in 0x format from public key
const sliced_publicKey = publicKey.slice(1);
const hashed_publicKey = keccak256(sliced_publicKey);
const nice_address = hashed_publicKey.slice(-20);
const hexAddress = Array.from(nice_address, byte => byte.toString(16).padStart(2, '0')).join('');
const ethereum_address = "0x" + hexAddress
console.log("Address:", ethereum_address);