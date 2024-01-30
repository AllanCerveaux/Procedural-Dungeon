export enum LifeDamageOrHealType {
	Heart = '_heart',
	Extra = '_extra',
}

export class Life {
	private _heart = 6
	private _extra = 0
	private _max = 20

	setLife(life: { heart: number; extra: number; max: number }) {
		this._heart = life.heart
		this._extra = life.extra
		this.max = life.max
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

	set max(value: number) {
		this._max = Math.max(value, this._heart + this._extra)
	}

	increase(type: LifeDamageOrHealType, amount: number = 2) {
		if (type === LifeDamageOrHealType.Heart) {
			this.heart = Math.min(this._heart + amount, this._max)
		} else if (type === LifeDamageOrHealType.Extra) {
			const availableExtra = this._max - this._heart
			this.extra = Math.min(this._extra + amount, availableExtra)
		}
	}

	decrease(type: LifeDamageOrHealType, amount: number = 2) {
		if (type === LifeDamageOrHealType.Heart) {
			this.heart = Math.max(this._heart - amount, 0)
		} else if (type === LifeDamageOrHealType.Extra) {
			this.extra = Math.max(this._extra - amount, 0)
		}
	}
}
