import React, { useState } from "react";
import server from "./server";

function Transfer({ address, setBalance, isSignatureCorrect, isSignatureEmpty }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(false); // Track if Send Amount is not empty
  const [isRecipientValid, setIsRecipientValid] = useState(false); // Track if Recipient is not empty

  const setValue = (setter) => (evt) => setter(evt.target.value);

  // Update the validity of the Send Amount
  const handleSendAmountChange = (evt) => {
    const amount = evt.target.value;
    setSendAmount(amount);
    setIsAmountValid(amount.trim() !== ""); // Check if it's not empty
  };

  // Update the validity of the Recipient
  const handleRecipientChange = (evt) => {
    const recipientAddress = evt.target.value;
    setRecipient(recipientAddress);
    setIsRecipientValid(recipientAddress.trim() !== ""); // Check if it's not empty
  };

  // Transfer function
  async function transfer(evt) {
    evt.preventDefault();

    if (!isSignatureCorrect || !isAmountValid || !isRecipientValid) {
      // If the signature is not correct, or if Send Amount or Recipient is empty, do not proceed with the transfer
      return;
    }

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={handleSendAmountChange}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={handleRecipientChange}
        ></input>
      </label>

      <input
        type="submit"
        className="button"
        value="Transfer"
        disabled={!isSignatureCorrect || !isAmountValid || !isRecipientValid} // Enable the button conditionally
      />
    </form>
  );
}

export default Transfer;