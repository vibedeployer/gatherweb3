import { ItemType } from '../../../types/Items'
import store from '../stores'
import Item from './Item'
import Network from '../services/Network'
import { openVideoscreenDialog } from '../stores/VideoScreenStore'

export default class Videoscreen extends Item {
  id?: string
  currentUsers = new Set<string>()

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.itemType = ItemType.VIDEOSCREEN
  }


  onOverlapDialog() {
    if (this.currentUsers.size === 0) {
      this.setDialogBox('Press R to use videoscreen')
    } else {
      this.setDialogBox('Press R join')
    }
  }


  openDialog(network: Network) {

    store.dispatch(openVideoscreenDialog("test"))

  }
}
