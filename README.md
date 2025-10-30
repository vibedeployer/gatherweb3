# gatherweb3

Web3 Clone of Gather.Town for the Moralis x Filecoin hackathon. 

This project uses: 

Code/Packages: 
Typescript
Phaser 3 
Colyseus

Integrations: 
Moralis
IPFS/Filecoin 

Free Assets: 
https://limezu.itch.io/moderninteriors

MORALIS FUNCTIONS: 

Within the Login Dialogue we get the user to sign-in and try return an ENS resolved name otherwise return the address and store it in state. 

Within the Videoscreen Dialogue we get all the hackathons NFT's and display them as cards. 

Within the Philbot Dialogue we create necassary execute contract functions using moralis to submit and edit the users hack NFT.

FILECOIN FUNCTIONS: 

XMTP FUNCTIONS: 
- inlineLauncher has been deprecated so I need to replace it, it has been removed in latest commit just to get the latest build working. 





TO START PROJECT: 
server: 
yarn then yarn start

/client: 
yarn then yarn dev

KNOWN BUGS: 

relay.cc removed the inline receiver so the xmpt broke this week.  Need to work on integrating it again. 

sometimes pool table crashes when multiple ppl using at same time 
