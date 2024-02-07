import { DEFAULT_INPUT_KEYS } from '@constants'

export class Control {
	keys: Record<string, Phaser.Input.Keyboard.Key>
	private _axe_x: 1 | 0 | -1
	private _axe_y: 1 | 0 | -1

	constructor(scene: Phaser.Scene) {
		this.keys = scene.input.keyboard?.addKeys(DEFAULT_INPUT_KEYS) as Record<string, Phaser.Input.Keyboard.Key>
	}

	update() {
		this._axe_x = this.keys.left.isDown ? -1 : this.keys.right.isDown ? 1 : 0
		this._axe_y = this.keys.up.isDown ? -1 : this.keys.down.isDown ? 1 : 0
	}

	get axe(): Phaser.Math.Vector2 {
		return new Phaser.Math.Vector2(this._axe_x, this._axe_y)
	}

	get axe_x(): number {
		return this.axe.x
	}

	get axe_y(): number {
		return this.axe.y
	}
}
