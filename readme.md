# gatherweb3

Web3 Clone of Gather.Town for the Moralis x Filecoin hackathon. 

This project uses: 

Code: 
Typescript
Phaser 3 
Colyseus

Integrations: 
Moralis
IPFS/Filecoin 


MORALIS FUNCTIONS: 

Within the Login Dialogue we get the user to sign-in and try return an ENS resolved name otherwise return the address and store it in state. 
- https://github.com/elonsdev/gatherweb3/blob/main/client/src/components/LoginDialog.tsx 

Within the 

Within the Videoscreen Dialogue we get all the hackathons NFT's and display them as cards. 
- https://github.com/elonsdev/gatherweb3/blob/main/client/src/components/VideoscreenDialog.tsx

Within the Philbot Dialogue we create necassary execute contract functions to submit and edit the users hack NFT.
- https://github.com/elonsdev/gatherweb3/blob/main/client/src/components/PhilbotscreenDialog.tsx

FILECOIN FUNCTIONS: 
Within the Philbot Dialogue we push the hackathon content to IPFS and when returned add it as the URI to the minted hack NFT. 
- https://github.com/elonsdev/gatherweb3/blob/main/client/src/components/PhilbotscreenDialog.tsx
