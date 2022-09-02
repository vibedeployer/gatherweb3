import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

interface VideoscreenState {
  videoscreenDialogOpen: boolean
  videoscreenId: null | string
}

const initialState: VideoscreenState = {
  videoscreenDialogOpen: false,
  videoscreenId: null,
}

export const videoscreenSlice = createSlice({
  name: 'videoscreen',
  initialState,
  reducers: {
    openVideoscreenDialog: (state, action: PayloadAction<string>) => {
      state.videoscreenDialogOpen = true
      state.videoscreenId = action.payload
      console.log("state change")
      const game = phaserGame.scene.keys.game as Game
      game.disableKeys()
    },
    closeVideoscreenDialog: (state) => {
      const game = phaserGame.scene.keys.game as Game
      game.enableKeys()

      state.videoscreenDialogOpen = false
      state.videoscreenId = null

    }
  },
})

export const { openVideoscreenDialog, closeVideoscreenDialog } =
  videoscreenSlice.actions

export default videoscreenSlice.reducer
