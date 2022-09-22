import { ItemType } from '../../../types/Items'
import store from '../stores'
import Item from './Item'
import Network from '../services/Network'
import { openPooltableDialog } from '../stores/PooltableStore'

export default class Pooltable extends Item {
  id?: string
  currentUsers = new Set<string>()

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.itemType = ItemType.POOLTABLE
  }


  onOverlapDialog() {
    if (this.currentUsers.size === 0) {
      this.setDialogBox('Press R to play pool')
    } else {
      this.setDialogBox('Press R join')
    }
  }


  openDialog(network: Network) {

    store.dispatch(openPooltableDialog("test"))

  }
}
