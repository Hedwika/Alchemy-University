// get_public_key.jsx
import { recoverPublicKey as secpRecoverPublicKey } from "ethereum-cryptography/secp256k1";

export const recoverPublicKey = (msgHashed, signature, recoveryBit) => {
    const public_key = secpRecoverPublicKey(msgHashed, signature, recoveryBit);
    return public_key;
};