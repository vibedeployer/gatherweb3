import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

interface NftmintState {
  nftmintDialogOpen: boolean
  nftmintId: null | string
}

const initialState: NftmintState = {
  nftmintDialogOpen: false,
  nftmintId: null,
}

export const nftmintSlice = createSlice({
  name: 'nftmint',
  initialState,
  reducers: {
    openNftmintDialog: (state, action: PayloadAction<string>) => {
      state.nftmintDialogOpen = true
      state.nftmintId = action.payload
      console.log("state change")
      const game = phaserGame.scene.keys.game as Game
      game.disableKeys()
    },
    closeNftmintDialog: (state) => {
      const game = phaserGame.scene.keys.game as Game
      game.enableKeys()

      state.nftmintDialogOpen = false
      state.nftmintId = null

    }
  },
})

export const { openNftmintDialog, closeNftmintDialog } =
  nftmintSlice.actions

export default nftmintSlice.reducer
