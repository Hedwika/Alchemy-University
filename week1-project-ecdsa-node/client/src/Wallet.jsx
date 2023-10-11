import React, { useState, useEffect } from "react";
import server from "./server";
import { checkPublicKey } from "./public_key_check";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  signature,
  setSignature,
  setIsSignatureCorrect,
}) {

  const [publicKeyError, setPublicKeyError] = useState(""); // New state for error message

  async function onChangeAddress(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
      checkPublicKey(address, signature, setIsSignatureCorrect, setPublicKeyError);
    } else {
      setBalance(0);
    }
  }

  useEffect(() => {
    // Check the public key when the component initially mounts
    checkPublicKey(address, signature, setIsSignatureCorrect, setPublicKeyError);
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  async function onChangeSignature(evt) {
    const signature = evt.target.value;
    setSignature(signature);
    checkPublicKey(address, signature, setIsSignatureCorrect, setPublicKeyError);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChangeAddress}></input>
      </label>

      <label>
        Address Signature
        <input placeholder="Paste the signature for the message 'I prove this is my address.'" signature={signature} onChange={onChangeSignature}></input>
      </label>

      <label className="error">{publicKeyError}</label> {/* Display signature error message if it's not empty */}

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
