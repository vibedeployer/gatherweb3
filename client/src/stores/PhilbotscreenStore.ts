import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

interface PhilbotscreenState {
  philbotscreenDialogOpen: boolean
  philbotscreenId: null | string
}

const initialState: PhilbotscreenState = {
  philbotscreenDialogOpen: false,
  philbotscreenId: null,
}

export const philbotscreenSlice = createSlice({
  name: 'philbotscreen',
  initialState,
  reducers: {
    openPhilbotscreenDialog: (state, action: PayloadAction<string>) => {
      state.philbotscreenDialogOpen = true
      state.philbotscreenId = action.payload
      console.log("state change")
      const game = phaserGame.scene.keys.game as Game
      game.disableKeys()
    },
    closePhilbotscreenDialog: (state) => {
      const game = phaserGame.scene.keys.game as Game
      game.enableKeys()

      state.philbotscreenDialogOpen = false
      state.philbotscreenId = null

    }
  },
})

export const { openPhilbotscreenDialog, closePhilbotscreenDialog } =
  philbotscreenSlice.actions

export default philbotscreenSlice.reducer
