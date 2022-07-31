import { DEFAULT_HEIGHT, DEFAULT_WIDTH, OVERLAY, SCENES } from '@constants'

import { HUDScene } from './overlay/hud.scene'
import { Knight } from '@objects/heroes/Knight'
import { emitter } from '../utils/events'

export class MainScene extends Phaser.Scene {
  hud: Phaser.Scene
  player: Knight
  constructor() {
    super({ key: SCENES.MAIN })
  }

  create() {
    this.player = new Knight(this, DEFAULT_WIDTH / 2, DEFAULT_HEIGHT / 2, 'f')

    this.cameras.main.setZoom(2)
    this.cameras.main.startFollow(this.player)

    this.hud = this.scene.add(OVERLAY.HUD, HUDScene, true, { life: this.player.life })

    emitter.on('game_over', () => {
      this.hud.scene.remove()
      this.scene.restart()
    })
  }

  update(time: number, delta: number): void {
    this.player.update(time, delta)
  }
}
