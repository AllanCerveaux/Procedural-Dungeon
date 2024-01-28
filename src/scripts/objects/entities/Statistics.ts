export type StatisticsType = 'strength' | 'attack_speed' | 'attack_distance' | 'luck' | 'speed'
export type StatisticBase = {
	strength: number
	attack_speed: number
	attack_distance: number
	luck: number
	max_speed: number
}

export class Statistics {
	private _strength: number
	private _attack_speed: number
	private _attack_distance: number
	private _luck: number
	private _max_speed: number

	setStatistic({ strength, attack_speed, attack_distance, luck, max_speed }: StatisticBase) {
		this.strength = strength
		this.attack_speed = attack_speed
		this.attack_distance = attack_distance
		this.luck = luck
		this.max_speed = max_speed
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

	get max_speed(): number {
		return this._max_speed
	}

	set max_speed(value: number) {
		this._max_speed = value
	}

	increase(type: StatisticsType, cost: number) {
		this[type] += cost
	}
	decrease(type: StatisticsType, cost: number) {
		this[type] -= cost
	}
}
