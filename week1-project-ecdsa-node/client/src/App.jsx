import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [this_address_public_key, setPublicKey] = useState("Paste the valid address to see the public key");
  const [signature, setSignature] = useState("");
  const [isSignatureCorrect, setIsSignatureCorrect] = useState(false); // Add a state variable

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        this_address_public_key={this_address_public_key}
        setPublicKey={setPublicKey}
        signature={signature}
        setSignature={setSignature}
        setIsSignatureCorrect={setIsSignatureCorrect} // Pass the callback function to Wallet
      />
      <Transfer
        setBalance={setBalance}
        address={address}
        isSignatureCorrect={isSignatureCorrect} // Pass isSignatureCorrect to Transfer
      />
    </div>
  );
}

export default App;