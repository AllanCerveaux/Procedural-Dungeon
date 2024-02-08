import { PLAYER_EMITTER } from './type'

import { Control } from '../base/Control'
import { EntityBase } from '../entity/EntityBase'
import { BaseConstructorArgs } from '../entity/type'
import { GUIEventEmitter, PlayerEmitter } from '@game/utils/events'
import { LifeDamageOrHealType } from '../base/Life'
import { LIFEBAR_EMITTER } from '../hud/Lifebar'
import { WeaponBase } from '../weapon/WeaponBase'

export class PlayerBase extends EntityBase {
	private control: Control
	private _weapon: WeaponBase<this> | null

	constructor({ scene, x, y, texture, name, statistics, life }: Omit<BaseConstructorArgs, 'type'>) {
		super({ scene, x, y, texture, name, statistics, life, type: 'player' })

		this.control = new Control(scene)
		this.eventHandler()
	}

	eventHandler() {
		PlayerEmitter.on(PLAYER_EMITTER.DAMAGE, (type: LifeDamageOrHealType, cost: number) => {
			this.life.decrease(type, cost)
			GUIEventEmitter.emit(LIFEBAR_EMITTER.DAMAGE, type, cost)
			this.hit()
		})
		PlayerEmitter.on(PLAYER_EMITTER.HEAL, (type: LifeDamageOrHealType, cost: number) => {
			this.life.increase(type, cost)
			GUIEventEmitter.emit(LIFEBAR_EMITTER.HEAL, type, cost)
			this.heal()
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

		if (this.control.keys.drop.isDown) {
			this.dropWeapon()
		}

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

	set weapon(value: WeaponBase<this>) {
		if (this._weapon) {
			this.dropWeapon()
		}

		value.attach(this)
		this._weapon = value
	}

	dropWeapon() {
		if (!this._weapon) return
		this._weapon.detach()
		this._weapon = null
	}
}
