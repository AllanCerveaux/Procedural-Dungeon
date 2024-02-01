import { LifeDamageOrHealType } from '@game/objects/base/Life'
import { HUDScene } from './overlay/hud.scene'
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, OVERLAY, SCENES } from '@constants'
import { PLAYER_EMITTER } from '@game/objects/player/type'
import { PlayerEmitter, SceneEventEmitter } from '@game/utils/events'
import { Knight } from '@objects/heroes/Knight'

export class MainScene extends Phaser.Scene {
	hud: Phaser.Scene | null
	player: Knight
	hitSquare: Phaser.GameObjects.Sprite
	healSquare: Phaser.GameObjects.Sprite

	constructor() {
		super({ key: SCENES.MAIN })
	}

	create() {
		this.hitSquare = this.physics.add.staticSprite(DEFAULT_WIDTH / 2 - 50, DEFAULT_HEIGHT / 2, 'objects', 'flask_red')
		this.healSquare = this.physics.add.staticSprite(
			DEFAULT_WIDTH / 2 + 50,
			DEFAULT_HEIGHT / 2,
			'objects',
			'flask_green',
		)

		this.physics.add.staticSprite
		this.player = new Knight(this, DEFAULT_WIDTH / 2, DEFAULT_HEIGHT / 2, 'f')

		this.cameras.main.setZoom(2)
		this.cameras.main.startFollow(this.player)

		this.hud = this.scene.add(OVERLAY.HUD, HUDScene, true, {
			player: this.player,
		})

		SceneEventEmitter.on('game_over', () => {
			this.hud?.scene.remove()
			this.scene.restart()
			SceneEventEmitter.removeAllListeners()
		})

		this.physics.add.overlap(this.player, this.hitSquare, (_, hitSquare) => {
			PlayerEmitter.emit(PLAYER_EMITTER.DAMAGE, 1)
			hitSquare.destroy()
		})
		this.physics.add.overlap(this.player, this.healSquare, (_, healSquare) => {
			PlayerEmitter.emit(PLAYER_EMITTER.HEAL, 1, LifeDamageOrHealType.Heart)
			healSquare.destroy()
		})
	}

	update(time: number, delta: number): void {
		this.player.update(time, delta)
	}
}
