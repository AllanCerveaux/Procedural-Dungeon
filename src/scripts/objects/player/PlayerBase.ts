import { PLAYER_EMITTER } from './type'

import { Control } from '../base/Control'
import { EntityBase } from '../entity/EntityBase'
import { BaseConstructorArgs } from '../entity/type'
import { GUIEventEmitter, PlayerEmitter } from '@game/utils/events'
import { LifeDamageOrHealType } from '../base/Life'
import { LIFEBAR_EMITTER } from '../hud/Lifebar'

export class PlayerBase extends EntityBase {
	private readonly LINEAR_SMOOTHING_VALUE = 0.05

	_control: Control

	constructor({ scene, x, y, name, statistics, life }: Omit<BaseConstructorArgs, 'type'>) {
		super({ scene, x, y, name, statistics, life, type: 'player' })

		this._control = new Control(scene)

		this.eventHandler()
	}

	eventHandler() {
		PlayerEmitter.on(PLAYER_EMITTER.DAMAGE, (type: LifeDamageOrHealType, cost: number) => {
			this._life.decrease(type, cost)
			GUIEventEmitter.emit(LIFEBAR_EMITTER.DAMAGE, type, cost)
			this.hit()
		})
		PlayerEmitter.on(PLAYER_EMITTER.HEAL, (type: LifeDamageOrHealType, cost: number) => {
			this._life.increase(type, cost)
			GUIEventEmitter.emit(LIFEBAR_EMITTER.HEAL, type, cost)
			this.heal()
		})
		PlayerEmitter.on(PLAYER_EMITTER.HEALTH_UP, (type: LifeDamageOrHealType) => {
			this._life.increase_max(type)
			GUIEventEmitter.emit(LIFEBAR_EMITTER.HEALTH_UP, type)
		})
		PlayerEmitter.on(PLAYER_EMITTER.HEALTH_DOWN, (type: LifeDamageOrHealType) => {
			this._life.decrease_max(type)
			GUIEventEmitter.emit(LIFEBAR_EMITTER.HEALTH_DOWN, type)
		})
	}

	protected preUpdate(time: number, delta: number): void {
		super.preUpdate(time, delta)

		this._control.update()
		if (Phaser.Input.Keyboard.JustDown(this._control.keys.fire)) {
			this.attack()
		}
		this.move()
	}

	move(): void {
		if (this._control.axe_x === 0 && this._control.axe_y === 0) {
			this.anims.play(`${this.name}_idle`, true)
			this.body.setVelocity(0, 0)
		} else {
			this.anims.play(`${this.name}_run`, true)
		}

		if (this._control.axe_x !== 0) {
			this.setFlipX(this._control.axe_x < 0)
		}

		const { x, y } = Phaser.Math.LinearXY(
			this.body.velocity,
			new Phaser.Math.Vector2(this.body.maxSpeed * this._control.axe_x, this.body.maxSpeed * this._control.axe_y),
			this.LINEAR_SMOOTHING_VALUE,
		)

		this.body.setVelocity(x, y)
	}
	/**
	 * @hint Use Zone to defined hit-zone
	 * @link https://newdocs.phaser.io/docs/3.54.0/Phaser.GameObjects.Zone
	 * @returns
	 */
	attack(): void {
		return
	}
}
