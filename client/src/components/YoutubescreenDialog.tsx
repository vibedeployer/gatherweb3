import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { useAppSelector, useAppDispatch } from '../hooks'
import { closeYoutubescreenDialog } from '../stores/YoutubescreenStore'

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'



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
  overflow: hidden;
  margin-right: 50px;
  text-align: center;

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

export default function YoutubescreenDialog() {
  
  const dispatch = useAppDispatch()


 



  return (
    <Backdrop>
      <Wrapper>
        <IconButton
          aria-label="close dialog"
          className="close"
          onClick={() => dispatch(closeYoutubescreenDialog())}
        >
          <CloseIcon />
        </IconButton>
        
          <VideoscreenWrapper>
            
          <div>
            <LiteYouTubeEmbed 
                id="puuj3jNfnsM"
                title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
            />
          </div>
          <br/>
          <div style={{display:"flex"}}>
            <div style={{minWidth:"24%", marginLeft: "5px"}}>
              <LiteYouTubeEmbed 
                  id="O7j_MpQ3ZlE"
                  title="Valist Presents: Publishing Apps and Games in Web3"
              />
            </div>
            <div style={{minWidth:"24%", marginLeft: "5px"}}>
              <LiteYouTubeEmbed 
                  
                  id="75gajWfjkaU"
                  title=""
              />
            </div>
            <div style={{minWidth:"24%", marginLeft: "5px"}}>
              <LiteYouTubeEmbed 
                  id="w8i2lK4XjS8"
                  title=""
              />
            </div>
            <div style={{minWidth:"24%", marginLeft: "5px"}}>
              <LiteYouTubeEmbed 
                  id="V1FQQwnB3as"
                  title=""
              />
            </div>
          </div>
          <div style={{display:"flex" ,marginTop: "10px"}}>
            <div style={{minWidth:"24%", marginLeft: "5px"}}>
              <LiteYouTubeEmbed 
                  id="hZMc9UTBPLo"
                  title=""
              />
            </div>
            <div style={{minWidth:"24%", marginLeft: "5px"}}>
              <LiteYouTubeEmbed 
                  id="ysSYTj5c6po"
                  title=""
              />
            </div>
            <div style={{minWidth:"24%", marginLeft: "5px"}}>
              <LiteYouTubeEmbed 
                  id="vo6nWEDVSLs"
                  title=""
              />
            </div>
            <div style={{minWidth:"24%", marginLeft: "5px"}}>
              <LiteYouTubeEmbed 
                  id="NVZr9BSUYDU"
                  title=""
              />
            </div>
           

          
           </div>

          </VideoscreenWrapper>
        
      </Wrapper>
    </Backdrop>
  )
}
