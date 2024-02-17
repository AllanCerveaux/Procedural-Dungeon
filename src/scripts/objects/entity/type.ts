import { LifeBase } from '../base/Life'
import { StatisticBase } from '../base/Statistics'

export type BaseConstructorArgs = {
	scene: Phaser.Scene
	x: number
	y: number
	name: string
	type: 'enemy' | 'player'
	statistics?: StatisticBase
	life?: LifeBase
}
