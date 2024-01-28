import WebFontFile from '@utils/font-loader'
import { AnimationLoader, AssetsLoader } from '@utils/loaders'

import { SCENES } from '@constants'

export class PreloadScene extends Phaser.Scene {
	progress_bar: Phaser.GameObjects.Graphics
	progress_box: Phaser.GameObjects.Graphics
	loading_text: Phaser.GameObjects.Text
	assets_text: Phaser.GameObjects.Text
	percentage: Phaser.GameObjects.Text

	constructor(
		private assetsLoader: AssetsLoader,
		private animationLoader: AnimationLoader,
	) {
		super({ key: SCENES.PRELOAD })
		this.assetsLoader = new AssetsLoader(this)
		this.animationLoader = new AnimationLoader(this)
	}

	preload() {
		this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'))
		this.load.image('cube', 'cube_test.png')
		this.assetsLoader.init()

		this.progress_bar = this.add.graphics()
		this.progress_box = this.add.graphics()

		this.progress_bar.fillStyle(0x222222, 0.8)
		this.progress_box.fillRect(this.cameras.main.width / 2 - 160, this.cameras.main.height / 2, 320, 50)

		this.loading_text = this.add
			.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'Loading...', {
				font: '20px monospace',
				color: '#ffffff',
			})
			.setOrigin(0.5, 0.5)

		this.percentage = this.add
			.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 25, '0%', {
				font: '20px monospace',
				color: '#ffffff',
			})
			.setOrigin(0.5, 0.5)

		this.load.on('progress', (value) => {
			this.percentage.setText(`${parseInt(value) * 100}%`)
			this.progress_bar.clear()
			this.progress_bar.fillStyle(0xdedede, 1)
			this.progress_bar.fillRect(this.cameras.main.width / 2 - 160, this.cameras.main.height / 2, 300 * value, 20)
		})

		this.load.on('complete', () => this.scene.start(SCENES.MAIN))
	}

	create() {
		this.animationLoader.init()
	}
}
