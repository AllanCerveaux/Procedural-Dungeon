export enum LifeDamageOrHealType {
	Heart = 'heart',
	Extra = 'extra',
}

export type LifeBase = {
	heart: number
	extra: number
}

export class Life {
	private _heart: number
	private _extra: number
	private _max: number

	constructor(life: LifeBase) {
		this._heart = life.heart
		this._extra = life.extra
		this._max = 20
	}

	get heart(): number {
		return this._heart
	}

	set heart(value: number) {
		this._heart = Math.min(value, this._max)
	}

	get extra(): number {
		return this._extra
	}

	set extra(value: number) {
		this._extra = Math.max(0, Math.min(value, this._max - this._heart))
	}

	get max(): number {
		return this._max
	}

	increase(type: LifeDamageOrHealType, amount: number = 2) {
		this[type] = Math.min(this[type] + amount, this._max)
	}

	decrease(type: LifeDamageOrHealType, amount: number = 2) {
		this[type] = Math.max(this[type] - amount, 0)
	}
}
