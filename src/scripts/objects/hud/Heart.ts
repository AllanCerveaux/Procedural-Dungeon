import { HEART_STATE } from './types'

export class Heart extends Phaser.GameObjects.Sprite {
	declare state: HEART_STATE

	static readonly EXTRA_HEART_TINT = 0xc00baff

	isExtra: boolean

	constructor(scene: Phaser.Scene, x: number, y: number, isExtra = false, state = HEART_STATE.FULL) {
		super(scene, x, y, 'ui')

		scene.add.existing(this)
		this.setScale(2)

		this.isExtra = isExtra

		if (isExtra) {
			this.setTint(Heart.EXTRA_HEART_TINT)
		}

		this.state = Math.max(HEART_STATE.EMPTY, Math.min(state, HEART_STATE.FULL))

		this.updateFrame()
	}

	protected preUpdate(time: number, delta: number): void {
		super.preUpdate(time, delta)
	}

	private updateFrame(): void {
		switch (this.state) {
			case HEART_STATE.EMPTY:
				this.setFrame('ui_heart_empty')
				break
			case HEART_STATE.HALF:
				this.setFrame('ui_heart_half')
				break
			case HEART_STATE.FULL:
				this.setFrame('ui_heart_full')
				break
			default:
				throw new Error(`Invalid state: ${this.state}`)
		}
	}

	/**
	 * Return true when state is Empty
	 * @returns A boolean value.
	 */
	get isEmpty(): boolean {
		return this.state === HEART_STATE.EMPTY
	}

	/**
	 * If the state is less than 2, increase the state by 1
	 */
	increaseState(cost: number) {
		this.state = Math.min(this.state + cost, HEART_STATE.FULL)
		this.updateFrame()
	}

	/**
	 * If the state is greater than 0, decrease the state by 1
	 */
	decreaseState(cost = 1) {
		this.state = Math.max(this.state - cost, HEART_STATE.EMPTY)
		this.updateFrame()
	}
}
