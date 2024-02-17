import { Heart } from './Heart'
import { GUIEventEmitter } from '@utils/events'
import { Life, LifeDamageOrHealType } from '../base/Life'
import { HEART_STATE } from './types'

export enum LIFEBAR_EMITTER {
	DAMAGE = 'LIFEBAR_DAMAGE',
	HEAL = 'LIFEBAR_HEAL',
	HEALTH_UP = 'LIFEBAR_HEALTH_UP',
	HEALTH_DOWN = 'LIFEBAR_HEALTH_DOWN',
}

export class Lifebar extends Phaser.GameObjects.Container {
	declare list: Heart[]
	grid: Heart[]

	constructor(scene: Phaser.Scene, x: number, y: number, life: Life) {
		super(scene, x, y)
		this.scene.add.existing(this)

		this.maxSize = life.max / 2

		this.generate(life.heart, life.extra)

		this.setupListeners()
	}

	private setupListeners() {
		GUIEventEmitter.on(LIFEBAR_EMITTER.DAMAGE, this.damage, this)
		GUIEventEmitter.on(LIFEBAR_EMITTER.HEAL, this.heal, this)
		GUIEventEmitter.on(LIFEBAR_EMITTER.HEALTH_UP, this.health_up, this)
		GUIEventEmitter.on(LIFEBAR_EMITTER.HEALTH_DOWN, this.health_down, this)
	}

	private generate(heart: number, extra: number) {
		for (let i = 2; i <= heart + extra; i += 2) {
			const isExtra = i > heart ? LifeDamageOrHealType.Extra : LifeDamageOrHealType.Heart
			this.health_up(isExtra)
		}
	}

	private updateAlignment() {
		this.grid = Phaser.Actions.GridAlign(this.list, {
			width: 5,
			height: 2,
			cellWidth: 30,
			cellHeight: 25,
			position: Phaser.Display.Align.TOP_LEFT,
			x: 30,
			y: 20,
		})
	}

	private addHeart(heart: Heart) {
		const first_extra = this.getFirst<Heart>('isExtra', heart.isExtra)

		const extraHeartPosition = first_extra ? this.getIndex(first_extra) : this.length

		this.addAt(heart, heart.isExtra ? extraHeartPosition : 0)
	}

	health_up(type: LifeDamageOrHealType) {
		const isExtra = type === LifeDamageOrHealType.Extra

		if (this.length === this.maxSize && !isExtra) this.health_down(LifeDamageOrHealType.Extra)
		if (this.length === this.maxSize) return

		const heart = new Heart(this.scene, -30, -20, isExtra)

		this.addHeart(heart)

		this.updateAlignment()
	}

	health_down(type: LifeDamageOrHealType) {
		const isExtra = type === LifeDamageOrHealType.Extra
		const last_heart = this.getAll('isExtra', isExtra).pop()

		if (!last_heart) return

		this.removeAt(this.getIndex(last_heart), true)
		this.updateAlignment()
	}

	heal(type: LifeDamageOrHealType, cost: number = 1) {
		const isExtra = type === LifeDamageOrHealType.Extra
		const heart = this.list.find((heart) => heart.isExtra === isExtra && heart.state !== HEART_STATE.FULL)

		if (!heart) return

		heart.increaseState(cost)
	}

	damage(type: LifeDamageOrHealType, cost: number = 1) {
		const isExtra = type === LifeDamageOrHealType.Extra
		const lastHeart = [...this.list].reverse().find((heart) => heart.isExtra === isExtra && !heart.isEmpty)

		if (!lastHeart) return

		lastHeart.decreaseState(cost)

		if (lastHeart.isEmpty && lastHeart.isExtra) {
			this.health_down(type)
		}
	}
}
