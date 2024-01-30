import { PLAYER_EMITTER } from './type'

import { Control } from '../base/Control'
import { EntityBase } from '../entity/EntityBase'
import { BaseConstructorArgs } from '../entity/type'

export class PlayerBase extends EntityBase {
	private control: Control

	constructor({ scene, x, y, texture, name }: Omit<BaseConstructorArgs, 'type'>) {
		super({ scene, x, y, texture, name, type: 'player' })

		this.control = new Control(scene)

		this.body.maxSpeed = 200

		this.eventHandler()
	}

	eventHandler() {
		this.on(PLAYER_EMITTER.DAMAGE, this.hit)
		this.on(PLAYER_EMITTER.HEAL, this.heal)
		this.on(PLAYER_EMITTER.HEALTH_UP, this.life.increase)
		this.on(PLAYER_EMITTER.HEALTH_DOWN, this.life.decrease)
	}

	protected preUpdate(time: number, delta: number): void {
		super.preUpdate(time, delta)
		if (this.life.heart + this.life.extra < 1) {
			this.die()
		}

		this.control.update()
		this.move(delta)
	}

	move(delta: number): void {
		if (this.control.axe_x === 0 && this.control.axe_y === 0) {
			this.anims.play(`${this.name}_idle`, true)
			this.body.setVelocity(0, 0)
		} else this.anims.play(`${this.name}_run`, true)

		this.setFlipX(this.control.axe_x < 0)

		const velocity_interop = 0.005 * delta

		const vertical_speed = Phaser.Math.Linear(
			this.body.velocity.y,
			this.body.maxSpeed * this.control.axe_y,
			velocity_interop,
		)
		const horizontal_speed = Phaser.Math.Linear(
			this.body.velocity.x,
			this.body.maxSpeed * this.control.axe_x,
			velocity_interop,
		)

		this.body.setVelocity(horizontal_speed, vertical_speed)
	}

	attack(): void {
		console.log('attack')
	}
}
