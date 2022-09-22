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
- https://github.com/elonsdev/gatherweb3/blob/main/client/src/components/LoginDialog.tsx 

Within the 

Within the Videoscreen Dialogue we get all the hackathons NFT's and display them as cards. 
- https://github.com/elonsdev/gatherweb3/blob/main/client/src/components/VideoscreenDialog.tsx

Within the Philbot Dialogue we create necassary execute contract functions using moralis to submit and edit the users hack NFT.
- https://github.com/elonsdev/gatherweb3/blob/main/client/src/components/PhilbotscreenDialog.tsx

FILECOIN FUNCTIONS: 
Within the Philbot Dialogue we push the hackathon content to IPFS and when returned add it as the URI to the minted hack NFT (by using it in the moralis functions). 
- https://github.com/elonsdev/gatherweb3/blob/main/client/src/components/PhilbotscreenDialog.tsx


XMTP FUNCTIONS: 
- inlineLauncher has been deprecated so I need to replace it, it has been removed in latest commit just to get the latest build working. 
https://github.com/elonsdev/gatherweb3/commit/48a5e5801127c516845148d6f0634ac870b40745#diff-59b311555709d3455a4c65af70ab4db5a9a2ac185183e721776a025d3edfb5d1 


VALIST: 
https://app.valist.io/elonsdev/gatherverse

NFT collection of Hackathon entries on mumbai: https://testnets.opensea.io/collection/hackerverse 


TO START PROJECT: 
server: 
yarn then yarn start

/client: 
yarn then yarn dev

KNOWN BUGS: 

relay.cc removed the inline receiver so the xmpt broke this week.  Need to work on integrating it again. 

sometimes pool table crashes when multiple ppl using at same time 