import { PlayerBase } from '../player/PlayerBase'

export class Knight extends PlayerBase {
	constructor(scene: Phaser.Scene, x: number, y: number, gender: string) {
		const name = `knight_${gender}`

		super({
			scene,
			x,
			y,
			texture: 'characters',
			name,
			statistics: {
				strength: 200,
				attack_speed: 180,
				attack_distance: 100,
				luck: 0,
				speed: 130,
			},
			life: { heart: 8, extra: 0 },
		})
	}
}
