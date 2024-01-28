import { Dic } from '@types'
import { DEFAULT_INPUT_KEYS } from '@constants'

export class Control {
	keys: Dic<Phaser.Input.Keyboard.Key>
	horizontal_axe: 1 | 0 | -1
	vertical_axe: 1 | 0 | -1

	constructor(scene: Phaser.Scene) {
		this.keys = scene.input.keyboard?.addKeys(DEFAULT_INPUT_KEYS) as Dic<Phaser.Input.Keyboard.Key>
	}

	update() {
		this.horizontal_axe = this.keys.left.isDown ? -1 : this.keys.right.isDown ? 1 : 0
		this.vertical_axe = this.keys.up.isDown ? -1 : this.keys.down.isDown ? 1 : 0
	}
}
