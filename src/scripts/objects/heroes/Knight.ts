import { PlayerBase } from '../player/PlayerBase'

export class Knight extends PlayerBase {
	constructor(scene: Phaser.Scene, x: number, y: number, gender: string) {
		const name = `knight_${gender}`

		super({ scene, x, y, texture: 'characters', name })

		this.life.setLife({ heart: 8, extra: 0, max: 20 })
	}
}
