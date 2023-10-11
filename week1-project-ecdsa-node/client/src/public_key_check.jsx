import server from "./server";
import { recoverPublicKey } from "./get_public_key";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

export async function checkPublicKey(address, signature, setIsSignatureCorrect, setPublicKeyError) {
    if (signature) {

        // check if the public key in the server matches the public key from the signature
        // 1) get the signature array
        const inputString = signature;
        const startBracket = inputString.indexOf("[", inputString.indexOf("[") + 1);
        const endBracket = inputString.indexOf("]");
        const slicedString = inputString.slice(startBracket, endBracket + 1);
        const numbersArray = slicedString
          .replace(/\[|\]|\s/g, '')
          .split(',')
        const signature_array = numbersArray.map(Number);
        console.log("Signature array: ", signature_array);
  
        // 2) get the recovery bit
        const strippedSignature = signature.replace(/\s/g, '');
        const secondLastCharacter = parseInt(strippedSignature[strippedSignature.length - 2]);
        console.log("recovery bit: ", secondLastCharacter);
  
        // 3) use function recoverPublicKey from the get_public_key.jsx script:
        const msgHashed = keccak256(Uint8Array.from(utf8ToBytes("I prove this is my address.")));
  
        const userSignature = [
            new Uint8Array(signature_array),
            secondLastCharacter
        ];
  
        const publicKey = toHex(recoverPublicKey(msgHashed, userSignature[0], userSignature[1]));
        console.log("Public key: ", publicKey);
  
        // 4) check if the database public key matches the recovered public key:
        const {
          data: { this_address_public_key },
        } = await server.get(`publicKey/${address}`);
        console.log("Database public key: ", this_address_public_key);
  
        if (publicKey === this_address_public_key) {
          setIsSignatureCorrect(true);
          setPublicKeyError("Correct signature.");
          console.log("Transfer enabled!");
        } else {
          setIsSignatureCorrect(false);
          setPublicKeyError("Signature is not correct.");
          console.log("Signature public key is not matching address public key!");
        }
    }
}