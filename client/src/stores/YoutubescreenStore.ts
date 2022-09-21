import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

interface YoutubescreenState {
  youtubescreenDialogOpen: boolean
  youtubescreenId: null | string
}

const initialState: YoutubescreenState = {
  youtubescreenDialogOpen: false,
  youtubescreenId: null,
}

export const youtubescreenSlice = createSlice({
  name: 'youtubescreen',
  initialState,
  reducers: {
    openYoutubescreenDialog: (state, action: PayloadAction<string>) => {
      state.youtubescreenDialogOpen = true
      state.youtubescreenId = action.payload
      console.log("state change")
      const game = phaserGame.scene.keys.game as Game
      game.disableKeys()
    },
    closeYoutubescreenDialog: (state) => {
      const game = phaserGame.scene.keys.game as Game
      game.enableKeys()

      state.youtubescreenDialogOpen = false
      state.youtubescreenId = null

    }
  },
})

export const { openYoutubescreenDialog, closeYoutubescreenDialog } =
  youtubescreenSlice.actions

export default youtubescreenSlice.reducer
