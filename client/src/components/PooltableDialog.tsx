import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { useAppSelector, useAppDispatch } from '../hooks'
import { closePooltableDialog } from '../stores/PooltableStore'

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

export default function PooltableDialog() {
  
  const dispatch = useAppDispatch()


  return (
    <Backdrop>
      <Wrapper>
        <IconButton
          aria-label="close dialog"
          className="close"
          onClick={() => dispatch(closePooltableDialog())}
        >
          <CloseIcon />
        </IconButton>
        
          <VideoscreenWrapper>
            
          <iframe style={{width: "100%", height: "100%" ,border: "0px"}} src="https://www.gamezop.com/g/hgempP8Sc?id=zv1Y2I8P"> </iframe>
            
            

          </VideoscreenWrapper>
        
      </Wrapper>
    </Backdrop>
  )
}
