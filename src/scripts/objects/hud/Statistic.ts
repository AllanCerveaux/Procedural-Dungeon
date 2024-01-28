import Base from '@objects/entities/Base'

type StatisticOption = {
	entity: Base
	statName: string
}

export default class Statistic extends Phaser.GameObjects.Text {
	statName: string
	value: number
	entity: Base
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		text: string,
		style: Phaser.Types.GameObjects.Text.TextStyle,
		{ entity, statName }: StatisticOption,
	) {
		super(
			scene,
			x,
			y,
			text || '',
			style || {
				fontFamily: '"Press Start 2P"',
				fontSize: '16px',
				color: 'white',
				align: 'right',
			},
		)
		this.statName = statName
		this.entity = entity
		this.setText(`${statName}: ${entity.statistics[statName] / 100}`)
	}

	statUP(value: number) {
		this.value += value
	}

	statDOWN(value: number) {
		this.value -= value
	}

	updateStat() {
		console.log(this.value, this.entity.statistics)
		this.setText(`${this.statName}: ${this.entity.statistics[this.statName] / 100}`)
		// this[`stat${state}`](value)
	}
}
