import { SCENES } from '@constants'
export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.PRELOAD })
  }
  preload() {
    this.load.image('cube', 'cube_test.png')
  }
  create() {
    console.log(this.scene.key)
    this.scene.start('main-scene')
  }
}
