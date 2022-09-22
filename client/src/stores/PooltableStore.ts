import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

interface PooltableState {
  pooltableDialogOpen: boolean
  pooltableId: null | string
}

const initialState: PooltableState = {
  pooltableDialogOpen: false,
  pooltableId: null,
}

export const pooltableSlice = createSlice({
  name: 'pooltable',
  initialState,
  reducers: {
    openPooltableDialog: (state, action: PayloadAction<string>) => {
      state.pooltableDialogOpen = true
      state.pooltableId = action.payload
      console.log("state change")
      const game = phaserGame.scene.keys.game as Game
      game.disableKeys()
    },
    closePooltableDialog: (state) => {
      const game = phaserGame.scene.keys.game as Game
      game.enableKeys()

      state.pooltableDialogOpen = false
      state.pooltableId = null

    }
  },
})

export const { openPooltableDialog, closePooltableDialog } =
  pooltableSlice.actions

export default pooltableSlice.reducer
