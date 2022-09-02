import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { useAppSelector, useAppDispatch } from '../hooks'
import { closeVideoscreenDialog } from '../stores/VideoScreenStore'

import {Moralis} from 'moralis-v1/dist/moralis.js';


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
  border-radius: 16px;
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
  border-radius:10px;
  padding: 10px;
  margin: 10px;
`

export default function VideoscreenDialog() {

  const dispatch = useAppDispatch()

  const [page, setPage] = useState<string>("HACKS")
  const toSubmit = () => {
    setPage("SUBMIT")
  }
  const toHacks = () => {
    setPage("HACKS")
  }

  const [hacks, setHacks] = useState([
    {title: "MyHack1",
    text: "This is a short description of the project in one sentance.",
    image: "https://via.placeholder.com/600x400.png",
    githuburl: "https://github.com/example",
    livelink: "https://google.com",
    owner_of: "xxxx"
    }
  ])
  const [hacksContent, setHacksContent] = useState([] as any)

  const fetchHacksContent = async () => {
    
    const limit5 = hacks?.slice(0,5)

    
    let contentHack:any[] = []

    if (limit5) {
      limit5.map(async (hack) => {
        if (hack) {
          const {title, text, image, githuburl, livelink, owner_of} = hack
          contentHack.push({title, text, image, githuburl, livelink, owner_of}); 
        }
      })
    }

    setHacksContent(contentHack)
  }

  useEffect (() => {
    if (hacks) {
      fetchHacksContent();

    }
  }, []); 

  function RenderOfCards() {
    function renderer() {
      return (
        <div>
          {hacks && hacksContent.map(( card, i) => {
            const {title, text, image, githuburl, livelink, owner_of} = card;
            return ( 
              <Card key={i}>
                <h1>{title}</h1>
                <img style={{maxWidth:"100%", maxHeight: "160px"}} src={image}/>
                <p>{text}</p>
                <div style={{display:"flex", justifyContent: "space-around"}}>
                  <p><a href={githuburl}>Github</a></p>
                  <p><a href={livelink}>Dapp</a></p>
                </div>
                <p>{owner_of}</p>
              </Card>
            ); 
          })}
        </div>
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
                <h1>Hackathon Entries</h1>
                <CardWrapper>
                  {RenderOfCards()}
                </CardWrapper>
    
                <p onClick={toSubmit}>Submit your hack</p> <p>Edit your hack</p>
              </>
            ):(<></>)}
            {page == "SUBMIT" ? (
              <>
                <h1>Submit your hack</h1>
                <p onClick={toHacks}>Back</p> 
              </>
            ):(<></>)}
            

          </VideoscreenWrapper>
        
      </Wrapper>
    </Backdrop>
  )
}
