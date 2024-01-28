import { DEFAULT_HEIGHT } from '@constants'
import { PlayerEmitter } from '@utils/events'
import Statistic from '@objects/hud/Statistic'
import Base from '@objects/entities/Base'

export enum STATS_EMITTER {
	STATS_CHANGE = 'STATS_CHANGE',
}

export default class Stats extends Phaser.GameObjects.Container {
	grid: Phaser.GameObjects.GameObject[]
	entity: Base
	constructor(scene: Phaser.Scene, x: number, y: number, entity: Base) {
		super(scene, x, y)
		this.scene.add.existing(this)
		this.entity = entity
		this.generate(entity.statistics)
		PlayerEmitter.on(STATS_EMITTER.STATS_CHANGE, this.stateChange, this)
	}

	update() {
		this.grid = Phaser.Actions.GridAlign(this.list, {
			width: 1,
			height: 5,
			cellHeight: 40,
			position: Phaser.Display.Align.LEFT_CENTER,
			x: 30,
			y: DEFAULT_HEIGHT / 3,
		})
	}
	// @TODO: Find Another way to generate stats
	generate(stats) {
		Object.keys(stats).forEach((name) => {
			name = name.replace('_', '')
			const text = new Statistic(
				this.scene,
				-20,
				-50,
				'',
				{},
				{
					entity: this.entity,
					statName: name,
				},
			)
			this.add(text)
		})
	}

	stateChange(_, name: string) {
		;(this.getFirst('statName', name) as Statistic).updateStat()
	}
}
