import { MainScene } from '@game/scenes/main.scene'
import { SceneEventEmitter } from '@game/utils/events'

import type { BaseConstructorArgs } from './type'
import type { StatisticBase } from '../base/Statistics'

import { Life } from '../base/Life'
import { Statistics } from '../base/Statistics'

const default_statistics: StatisticBase = {
	strength: 200,
	attack_speed: 180,
	attack_distance: 100,
	luck: 0,
	max_speed: 130,
}

const default_life = {
	heart: 6,
	extra: 0,
}

export abstract class EntityBase extends Phaser.GameObjects.Sprite {
	declare scene: MainScene
	declare body: Phaser.Physics.Arcade.Body

	life: Life
	statistics: Statistics

	entity_type: BaseConstructorArgs['type']

	constructor({
		scene,
		x,
		y,
		texture,
		name,
		type,
		statistics = default_statistics,
		life = default_life,
	}: BaseConstructorArgs) {
		super(scene, x, y, texture)

		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)

		this.name = name
		this.entity_type = type

		this.body
			.setCollideWorldBounds(true)
			.setDamping(true)
			.setSize(this.body.halfWidth / 2, this.body.halfHeight / 1.5)
			.setOffset(this.body.halfWidth, 14)

		this.life = new Life(life)
		this.statistics = new Statistics(statistics)
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
		if (this.life.total < 1) {
			this.die()
		}

		this.anims.play(`${this.name}_hit`, true)
		this.knockback()
		this.setTint(0xff0000)

		this.scene.time.addEvent({
			delay: 100,
			callback: () => {
				this.clearTint()
			},
		})
	}

	// @TODO: need review
	knockback(force: number = 100): void {
		if (this.body.facing === 13 || this.body.facing === 14) {
			this.body.velocity.x = this.flipX ? force : -1 * force
		} else if (this.body.facing === 11 || this.body.facing === 12) {
			this.body.velocity.y = this.body.facing === 11 ? force : -1 * force
		}
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
