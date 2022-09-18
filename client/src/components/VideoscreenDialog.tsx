import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { useAppSelector, useAppDispatch } from '../hooks'
import { closeVideoscreenDialog } from '../stores/VideoscreenStore'

import {Moralis} from 'moralis-v1/dist/moralis.js'



const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 16px 180px 16px 16px;
`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #222639;
  padding: 16px;
  color: #eee;
  position: relative;
  display: flex;
  flex-direction: column;

  .close {
    position: absolute;
    top: 16px;
    right: 16px;
  }
`

const VideoscreenWrapper = styled.div`
  flex: 1;
  border-radius: 25px;
  overflow: hidden;
  margin-right: 50px;
  text-align: center;

  iframe {
    width: 100%;
    height: 100%;
    background: #fff;
  }
`

const CardWrapper = styled.div`
  display:flex;
  flex-wrap:wrap;
`

const Card = styled.div`
  width: 250px;
  background: black;
  padding: 10px;
  margin: 10px;
`

export default function VideoscreenDialog() {
  
  const dispatch = useAppDispatch()
  const [page, setPage] = useState<string>("HACKS")

  // TO GET ALL THE STUFF: 
  const [hacks, setHacks] = useState()
  const [hacksContent, setHacksContent] = useState([] as any)

  const fetchAllNFTs = async () => {
    
    Moralis.enableWeb3() 
    const options = {
      address: "0xf55080C038bd608F8D49091E138103b1F81A6Bcd",
      chain: "mumbai",
    };
    const nftOwners = await Moralis.Web3API.token.getNFTOwners(options);
    
    // console.log(nftOwners.result)
    const tokenUri = nftOwners?.result?.map((data) => {
      const {metadata, owner_of} = data
      
        if (metadata && metadata != null) {
        
          const metadataObj = JSON.parse(metadata)
        
          const {name, description, image, github_url, external_url} = metadataObj
          // console.log(metadataObj)
          return {name, description, image, github_url, external_url, owner_of}
        } else console.log("skip")
    }) 

    
    console.log(tokenUri)
    setHacks(tokenUri)
    
  }

  const fetchHacksContent = async () => {
    const limit5 = hacks?.slice(0,5)
    let contentHack:any[] = []

    if (limit5) {
      limit5.map(async (hack) => {
        if (hack && hack != undefined) {
          const {name, description, image, github_url, external_url, owner_of} = hack
          contentHack.push({name, description, image, github_url, external_url, owner_of}); 
        }
      })
    }
    console.log(contentHack)
    setHacksContent(contentHack)
  }

  

  useEffect (() => {
    if (hacks) {
      fetchHacksContent()
      
    }
  }, [hacks])


  useEffect (() => {
    if (!hacks) {
      fetchAllNFTs()
      
    }
  }, []); 
  
  const truncateAddy = (input) => {
    if (input.length > 5) {
       return input.substring(0, 7) + '...';
    }
    return input;
  }

  const truncateDescription = (input) => {
    if (input.length > 55) {
       return input.substring(0, 55) + '...';
    }
    return input;
  }

  function RenderOfCards() {
    function renderer() {
      return (
        <CardWrapper>
          {hacks && hacksContent.map(( card, i) => {
            const {name, description, image, github_url, external_url, owner_of} = card;
            const ownerUrl = `https://testnets.opensea.io/${owner_of}`
            return ( 
              <Card key={i}>
                <h1>{name}</h1>
                <img style={{maxWidth:"100%", maxHeight: "160px"}} src={image}/>
                <p>{truncateDescription(description)}</p>
                <div style={{display:"flex", justifyContent: "space-around"}}>
                  <p><a target={"_blank"} href={github_url}>Github</a></p>
                  <p><a target={"_blank"} href={external_url}>Dapp</a></p>
                </div>
                <p><a target={"_blank"} href={ownerUrl}>{truncateAddy(owner_of)}</a></p>
              </Card>
              
            ); 
          })}
        </CardWrapper>
      )
    }
    return renderer();
  };



  return (
    <Backdrop>
      <Wrapper>
        <IconButton
          aria-label="close dialog"
          className="close"
          onClick={() => dispatch(closeVideoscreenDialog())}
        >
          <CloseIcon />
        </IconButton>
        
          <VideoscreenWrapper>
            
            {page == "HACKS" ? (
              <>
                <h1>Moralis x Filecoin Hackathon Entries</h1>
                
                
                  {RenderOfCards()}
               
    
                
              </>
            ):(<></>)}
            
            

          </VideoscreenWrapper>
        
      </Wrapper>
    </Backdrop>
  )
}
