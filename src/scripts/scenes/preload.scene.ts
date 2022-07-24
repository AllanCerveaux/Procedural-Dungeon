import { AnimationLoader, AssetsLoader } from '@utils/loaders'

import { SCENES } from '@constants'

export class PreloadScene extends Phaser.Scene {
  constructor(private assetsLoader: AssetsLoader, private animationLoader: AnimationLoader) {
    super({ key: SCENES.PRELOAD })
    this.assetsLoader = new AssetsLoader(this)
    this.animationLoader = new AnimationLoader(this)
  }
  preload() {
    this.load.image('cube', 'cube_test.png')
    this.assetsLoader.init()
  }
  create() {
    this.animationLoader.init()
    this.scene.start(SCENES.MAIN)
  }
}
