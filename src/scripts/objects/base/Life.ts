import { MAX_HEART } from '../player/type'

export enum LifeDamageOrHealType {
	Heart = 'heart',
	Extra = 'extra',
}

export type LifeBase = {
	heart: number
	extra: number
}

export type LifeBaseValue = {
	current: number
	max: number
}

export class Life {
	private _heart: LifeBaseValue
	private _extra: LifeBaseValue
	private readonly _max: number = MAX_HEART

	constructor(life: LifeBase) {
		this._heart = {
			current: life.heart,
			max: life.heart,
		}
		this._extra = {
			current: life.extra,
			max: life.extra,
		}
	}

	get heart(): number {
		return this._heart.current
	}

	get max_heart(): number {
		return this._heart.max
	}

	get extra(): number {
		return this._extra.current
	}

	get max_extra(): number {
		return this._extra.max
	}

	get total(): number {
		return this._heart.current + this._extra.current
	}

	get max_total(): number {
		return this._heart.max + this._extra.max
	}

	get max(): number {
		return this._max
	}

	set max_heart(amount: number) {
		this._heart.max = amount
	}

	set max_extra(amount: number) {
		this._extra.max = amount
	}

	set heart(amount: number) {
		this._heart.current = amount
	}

	set extra(amount: number) {
		this._extra.current = amount
	}

	/**
	 * Increases the maximum value for a given type of life damage or heal.
	 * @param {LifeDamageOrHealType} type - The type of life damage or heal.
	 * @param {number} [amount=2] - The amount to increase the maximum value by.
	 * @returns void
	 */
	increase_max(type: LifeDamageOrHealType, amount: number = 2): void {
		if (this.max_total >= this.max && this._extra.max < 1) return

		const max_of_heart =
			type === LifeDamageOrHealType.Extra ? Phaser.Math.Difference(this.max, this.max_heart) : this.max

		if (type === LifeDamageOrHealType.Heart && this.max_total >= this.max && this.max_extra > 1) {
			this.decrease_max(LifeDamageOrHealType.Extra)
		}

		this[`max_${type}`] = Math.min(this[`max_${type}`] + amount, max_of_heart)
		this[type] = Math.min(this[type] + amount, this[`max_${type}`])
	}

	/**
	 *  Decreases the maximum value for a given type of life damage or heal.
	 *
	 * @param  {LifeDamageOrHealType} type - The type of life damage or heal.
	 * @param {number} [amount=2] - The amount to increase the maximum value by.
	 * @returns void
	 */
	decrease_max(type: LifeDamageOrHealType, amount: number = 2): void {
		this[`max_${type}`] = Math.max(this[`max_${type}`] - amount, 0)
		if (this[type] > this[`max_${type}`]) {
			this[type] = Math.max(this[`max_${type}`], 0)
		}
	}

	/**
	 * Increases the current value for a given type of life damage or heal.
	 *
	 * @param  {LifeDamageOrHealType} type - The type of life damage or heal.
	 * @param {number} [amount=2] - The amount to increase the maximum value by.
	 * @returns void
	 */
	increase(type: LifeDamageOrHealType, amount: number = 1) {
		this[type] = Math.min(this[type] + amount, this[`max_${type}`])
	}

	/**
	 * Decreases the current value for a given type of life damage or heal.
	 *
	 * @param  {LifeDamageOrHealType} type - The type of life damage or heal.
	 * @param {number} [amount=2] - The amount to increase the maximum value by.
	 * @returns void
	 */
	decrease(type: LifeDamageOrHealType, amount: number = 1) {
		this[type] = Math.max(this[type] - amount, 0)

		if (type === LifeDamageOrHealType.Extra && Phaser.Math.Difference(this.extra, this.max_extra) === 2) {
			this.decrease_max(LifeDamageOrHealType.Extra)
		}
	}
}
