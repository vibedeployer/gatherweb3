import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { useAppSelector, useAppDispatch } from '../hooks'
import { closePhilbotscreenDialog } from '../stores/PhilbotscreenStore'

import {Moralis} from 'moralis-v1/dist/moralis.js'
import { fileURLToPath } from 'url'
import { useDropzone } from "react-dropzone";

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

const PhilbotscreenWrapper = styled.div`
  flex: 1;
  border-radius: 25px;
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
  border-radius:10px;
  padding: 10px;
  margin: 10px;
`

export default function PhilbotscreenDialog() {
  
  const dispatch = useAppDispatch()

  const [page, setPage] = useState<string>("SUBMIT")
  const toSubmit = () => {
    setPage("SUBMIT")
  }

  const toEdit = () => {
    setPage("EDIT")
    fetchTokenId()
  }
  
  // TO SUBMIT A HACK: 

  const [submitTitle, setSubmitTitle] = useState("")
  const [submitText, setSubmitText] = useState("")
  const [submitImage, setSumbitImage] = useState("")
  const [submitGithubLink, setSubmitGithubLink] = useState("")
  const [submitLiveLink, setSubmitLiveLink] = useState("")
  const [submitYoutubeLink, setSubmitYoutubeLink] = useState("")


  const uploadFile = async (event) => {
    event.preventDefault()
    const metadata = {
      name: submitTitle,
      description: submitText,
      image: "https://via.placeholder.com/600x400.png",
      external_url: submitLiveLink,
      youtube_url: submitYoutubeLink,
      github_url: submitGithubLink,
    }

    try {
      const file = new Moralis.File(
        "metadata.json",
        { base64: btoa(JSON.stringify(metadata))},
        {
          type: "base64",
          saveIPFS: true,
        }
      )
      const result = await file.saveIPFS()
      // alert(result.ipfs())
      await mint(result.ipfs())
      
    } catch (error) {
      alert(error.message)
    }
  }

  const mint = async (_uri) => {
    let user = await Moralis.User.current()
    let options = {
      contractAddress: "0xf55080C038bd608F8D49091E138103b1F81A6Bcd",
      functionName: "mintHack", 
      abi: [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "uri",
              "type": "string"
            }
          ],
          "name": "mintHack",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
      ],
      params: {
        to: user.get('ethAddress'),
        uri: _uri,
      },
      msgValue: 0,
    }
    const transaction = await Moralis.executeFunction(options)
    
    console.log(transaction.hash)
    await transaction.wait()
  } 

  const fetchTokenId = async () => {
    let user = Moralis.User.current()
    const options = {
      chain: "mumbai",
      address: user.get('ethAddress'),
      token_address: "0xf55080C038bd608F8D49091E138103b1F81A6Bcd",
    }
    const polygonNFTs = await Moralis.Web3API.account.getNFTsForContract(options)

    setHacksTokenId(polygonNFTs.result[0].token_id)
  }

  const uploadEditFile = async (event) => {
    event.preventDefault()
    const metadata = {
      name: submitTitle,
      description: submitText,
      image: "https://via.placeholder.com/600x400.png",
      external_url: submitLiveLink,
      youtube_url: submitYoutubeLink,
      github_url: submitGithubLink,
    }

    try {
      const file = new Moralis.File(
        "metadata.json",
        { base64: btoa(JSON.stringify(metadata))},
        {
          type: "base64",
          saveIPFS: true,
        }
      )
      const result = await file.saveIPFS()
      // alert(result.ipfs())
      await edit(result.ipfs())
      
    } catch (error) {
      alert(error.message)
    }
  }

  const edit = async (_uri) => {
    let options = {
      contractAddress: "0xf55080C038bd608F8D49091E138103b1F81A6Bcd",
      functionName: "editHack", 
      abi: [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "uri",
              "type": "string"
            }
          ],
          "name": "editHack",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
      ],
      params: {
        tokenId: hacksTokenId,
        uri: _uri,
      },
      msgValue: 0,
    }
    const transaction = await Moralis.executeFunction(options)
    
    console.log(transaction.hash)
    await transaction.wait()
  } 

  // TO GET ALL THE STUFF: 


  const [hacksTokenId, setHacksTokenId] = useState()


  const onDrop =  useCallback(async acceptedFiles => {
    try {
      
      const data = acceptedFiles[0];
      console.log(data)

      const file = new Moralis.File("image.png", data);
      const result = await file.saveIPFS()
      setSumbitImage(result.ipfs())

      
    } catch (error) {
      alert(error)
    }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <Backdrop>
      <Wrapper>
        <IconButton
          aria-label="close dialog"
          className="close"
          onClick={() => dispatch(closePhilbotscreenDialog())}
        >
          <CloseIcon />
        </IconButton>
        
          <PhilbotscreenWrapper>
            
           
            {page == "SUBMIT" ? (
              <>
                <h1>SUBMIT YOUR HACK</h1>
                
                
                <div>
                  <form onSubmit={uploadFile} className="writeForm">
                    <div className="writeFormGroup">
                      <input
                        className="writeInput"
                        placeholder="Title"
                        type="text"
                        autoFocus={true}
                        value={submitTitle}
                        onChange={(e) => setSubmitTitle(e.target.value)}
                      />
                    </div>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {
                        isDragActive ?
                          <p>Drop the files here ...</p> :
                          <p>Drag 'n' drop the image here, or click to select image</p>
                      }
                    </div>
                    <img src={submitImage}/>
                    <div className="writeFormGroup">
                      <textarea
                        className="writeInput writeText"
                        placeholder="Short description of your project..."
                        autoFocus={true}
                        value={submitText}
                        onChange={(e) => setSubmitText(e.target.value)}
                      />
                      <input
                        className="writeInput writeText"
                        placeholder="Github Link"
                        type="text"
                        autoFocus={true}
                        value={submitGithubLink}
                        onChange={(e) => setSubmitGithubLink(e.target.value)}
                      />
                   
                      <input
                        className="writeInput writeText"
                        placeholder="Dapp Link"
                        type="text"
                        autoFocus={true}
                        value={submitLiveLink}
                        onChange={(e) => setSubmitLiveLink(e.target.value)}
                      />
                    </div>
                   
              
                    <Button variant="contained" color="secondary" type="submit">
                      Submit
                    </Button>
                  </form>
                </div>

              </>
            ):(<></>)}

            {page == "EDIT" ? (
              <>
                <h1>Edit your hack</h1>
                <div>
                  <form onSubmit={uploadEditFile} className="writeForm">
                    <div className="writeFormGroup">
                      <input
                        className="writeInput"
                        placeholder="Title"
                        type="text"
                        autoFocus={true}
                        value={submitTitle}
                        onChange={(e) => setSubmitTitle(e.target.value)}
                      />
                    </div>
                    <div className="writeFormGroup">
                      <textarea
                        className="writeInput writeText"
                        placeholder="Short description of your project..."
                        autoFocus={true}
                        value={submitText}
                        onChange={(e) => setSubmitText(e.target.value)}
                      />
                      <input
                        className="writeInput writeText"
                        placeholder="Github Link"
                        type="text"
                        autoFocus={true}
                        value={submitGithubLink}
                        onChange={(e) => setSubmitGithubLink(e.target.value)}
                      />
                   
                      <input
                        className="writeInput writeText"
                        placeholder="Dapp Link"
                        type="text"
                        autoFocus={true}
                        value={submitLiveLink}
                        onChange={(e) => setSubmitLiveLink(e.target.value)}
                      />
                    </div>
                   
                      
                    
                    <Button variant="contained" color="secondary" type="submit">
                      Submit
                    </Button>
                  </form>
                </div>

              </>
            ):(<></>)}
            

          </PhilbotscreenWrapper>
        
      </Wrapper>
    </Backdrop>
  )
}
