import { MainScene } from '@game/scenes/main.scene'
import { SceneEventEmitter } from '@game/utils/events'

import type { BaseConstructorArgs } from './type'
import type { StatisticBase } from '../base/Statistics'

import { Life } from '../base/Life'
import { Statistics } from '../base/Statistics'
import { Control } from '../base/Control'

const default_statistics: StatisticBase = {
	strength: 200,
	attack_speed: 180,
	attack_distance: 100,
	luck: 0,
	speed: 130,
}

const default_life = {
	heart: 6,
	extra: 0,
}

export abstract class EntityBase extends Phaser.GameObjects.Sprite {
	declare scene: MainScene
	declare body: Phaser.Physics.Arcade.Body

	readonly _name: string
	readonly _type: BaseConstructorArgs['type']
	abstract _control: Control

	_life: Life
	_statistics: Statistics

	constructor({ scene, x, y, name, type, statistics = default_statistics, life = default_life }: BaseConstructorArgs) {
		super(scene, x, y, 'characters')

		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)

		this.name = name
		this._type = type

		this._life = new Life(life)
		this._statistics = new Statistics(statistics)

		this.body
			.setCollideWorldBounds(true)
			.setDamping(true)
			.setSize(this.body.halfWidth / 2, this.body.halfHeight / 1.5)
			.setOffset(this.body.halfWidth, 14)
			.setMaxSpeed(this._statistics.speed)
	}

	abstract move(delta: number): void
	abstract attack(): void
	abstract eventHandler(): void

	heal(): void {
		this.setTint(0x00ff00)
		this.scene.time.addEvent({
			delay: 100,
			callback: () => {
				this.clearTint()
			},
		})
	}

	hit(): void {
		if (this._life.total === 0) {
			this.die()
		}

		this.anims.play(`${this.name}_hit`, true)
		this.knockback(Phaser.Math.Vector2.ZERO)
		this.setTint(0xff0000)

		this.scene.time.addEvent({
			delay: 100,
			callback: () => {
				this.clearTint()
			},
		})
	}

	knockback(direction: Phaser.Math.Vector2, force: number = 100): void {
		this.body.setVelocity(direction.x * force, direction.y * force)
	}

	freeze(value = false): void {
		this.body.moves = !value
	}

	die(): void {
		this.removeAllListeners()
		SceneEventEmitter.emit('game_over')
		this.destroy()
	}
}
