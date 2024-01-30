import { BaseConstructorArgs } from './type'
import { Life, LifeDamageOrHealType } from '../base/Life'

import { MainScene } from '@game/scenes/main.scene'

export abstract class EntityBase extends Phaser.GameObjects.Sprite {
	declare scene: MainScene
	declare body: Phaser.Physics.Arcade.Body

	life: Life

	entity_type: BaseConstructorArgs['type']

	constructor({ scene, x, y, texture, name, type }: BaseConstructorArgs) {
		super(scene, x, y, texture)

		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)

		this.setFrame(`${texture}_idle_anim_f0`)
		this.anims.play(`${texture}_idle`, true)

		this.name = name
		this.entity_type = type

		this.body
			.setCollideWorldBounds(true)
			.setDamping(true)
			.setSize(this.body.halfWidth / 2, this.body.halfHeight / 1.5)
			.setOffset(this.body.halfWidth, 14)

		this.life = new Life()
	}

	abstract move(delta: number): void
	abstract attack(): void
	abstract eventHandler(): void

	heal(cost: number, heal_type: LifeDamageOrHealType) {
		this.life.increase(heal_type, cost)
	}

	hit(cost: number, damage_type: LifeDamageOrHealType) {
		this.anims.play(`${this.name}_hit`, true)
		this.setTint(0xff0000)
		this.scene.time.addEvent({
			delay: 100,
			callback: () => {
				this.clearTint()
			},
		})
		this.life.decrease(damage_type, cost)
	}

	// @TODO: need review
	knockback(force: number = 100) {
		if (this.body.facing === 13 || this.body.facing === 14) {
			this.body.velocity.x = this.flipX ? force : -1 * force
		} else if (this.body.facing === 11 || this.body.facing === 12) {
			this.body.velocity.y = this.body.facing === 11 ? force : -1 * force
		}
	}

	freeze(value = false): void {
		this.body.moves = !value
	}

	die() {
		this.removeAllListeners()
		this.emit('game_over')
		this.destroy()
	}
}
