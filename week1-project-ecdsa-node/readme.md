## ECDSA Node - my solution

My very first React experience! :)
I decided to allow the user to paste the signature as a string. Here is my step-by-step procedure:

1) I created a "scripts" folder within the "server" directory. In this folder, there's a script that generates a random private key with a corresponding public key and address in the standard 0x format. Another script generates a signature for each private key and the standard message I planned to use in the app. I ran both scripts three times, and the results were stored in the "keys.txt" file. This part should not be included in the live app, as only the owner should have access to the private key.

2) I edited the "index.js" file in the "server" folder. I formatted the addresses in the "balances" variable nicely and added a new variable called "address_publicKey," where I stored the public key for each address to be used in the app. Perhaps in the future, I will add a script that can verify any pasted address and signature by generating the public key from the pasted address and comparing it with the pasted signature.

3) I edited the "Wallet.jsx," "App.jsx," and "Transfer.jsx" files in the "client" folder. This modification allows users to transfer funds only if the public key generated from the signature matches the public key stored in the "index.js" file, and if the "Send Amount" and "Recipient" fields are not empty. The system also provides feedback on whether the signature is correct or not.

## ECDSA Node - the task

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
