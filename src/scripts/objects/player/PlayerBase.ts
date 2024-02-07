import { PLAYER_EMITTER } from './type'

import { Control } from '../base/Control'
import { EntityBase } from '../entity/EntityBase'
import { BaseConstructorArgs } from '../entity/type'
import { GUIEventEmitter, PlayerEmitter } from '@game/utils/events'
import { LifeDamageOrHealType } from '../base/Life'
import { LIFEBAR_EMITTER } from '../hud/Lifebar'

export class PlayerBase extends EntityBase {
	private control: Control

	constructor({ scene, x, y, texture, name, statistics, life }: Omit<BaseConstructorArgs, 'type'>) {
		super({ scene, x, y, texture, name, statistics, life, type: 'player' })

		this.control = new Control(scene)

		this.body.maxSpeed = 200

		this.eventHandler()
	}

	eventHandler() {
		PlayerEmitter.on(PLAYER_EMITTER.DAMAGE, (type: LifeDamageOrHealType, cost: number) => {
			this.hit()
			this.life.decrease(type, cost)
			GUIEventEmitter.emit(LIFEBAR_EMITTER.DAMAGE, type, cost)
		})
		PlayerEmitter.on(PLAYER_EMITTER.HEAL, (type: LifeDamageOrHealType, cost: number) => {
			this.heal()
			this.life.increase(type, cost)
			GUIEventEmitter.emit(LIFEBAR_EMITTER.HEAL, type, cost)
		})
		PlayerEmitter.on(PLAYER_EMITTER.HEALTH_UP, (type: LifeDamageOrHealType) => {
			this.life.increase_max(type)
			GUIEventEmitter.emit(LIFEBAR_EMITTER.HEALTH_UP, type)
		})
		PlayerEmitter.on(PLAYER_EMITTER.HEALTH_DOWN, (type: LifeDamageOrHealType) => {
			this.life.decrease_max(type)
			GUIEventEmitter.emit(LIFEBAR_EMITTER.HEALTH_DOWN, type)
		})
	}

	protected preUpdate(time: number, delta: number): void {
		super.preUpdate(time, delta)

		this.control.update()
		this.move(delta)
	}

	move(delta: number): void {
		if (this.control.axe_x === 0 && this.control.axe_y === 0) {
			this.anims.play(`${this.name}_idle`, true)
			this.body.setVelocity(0, 0)
		} else {
			this.anims.play(`${this.name}_run`, true)
		}

		if (this.control.axe_x !== 0) {
			this.setFlipX(this.control.axe_x < 0)
		}

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
		return
	}
}
