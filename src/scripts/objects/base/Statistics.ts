export type StatisticsType = 'strength' | 'attack_speed' | 'attack_distance' | 'luck' | 'speed'

export type StatisticBase = Record<StatisticsType, number>

export class Statistics {
	private _strength: number = 0
	private _attack_speed: number = 0
	private _attack_distance: number = 0
	private _luck: number = 0
	private _speed: number = 0

	constructor(stats: StatisticBase) {
		Object.keys(stats).forEach((_key) => {
			const key = _key as keyof StatisticBase
			if (key in this) {
				this[key] = stats[key]
			}
		})
	}

	get strength(): number {
		return this._strength
	}

	set strength(value: number) {
		this._strength = value
	}

	get attack_speed(): number {
		return this._attack_speed
	}

	set attack_speed(value: number) {
		this._attack_speed = value
	}

	get attack_distance(): number {
		return this._attack_distance
	}

	set attack_distance(value: number) {
		this._attack_distance = value
	}

	get luck(): number {
		return this._luck
	}

	set luck(value: number) {
		this._luck = value
	}

	get speed(): number {
		return this._speed
	}

	set speed(value: number) {
		this._speed = value
	}

	increase(type: StatisticsType, cost: number): void {
		this[type] = this[type] + cost
	}

	decrease(type: StatisticsType, cost: number): void {
		this[type] = this[type] - cost
	}
}
