import Player from '@objects/player/Player'

export class Elf extends Player {
	constructor(scene: Phaser.Scene, x: number, y: number, gender: string) {
		const name = `elf_${gender}`

		super(scene, x, y, { key: 'characters', name })

		this.life.setLife({ heart: 8, extra: 0, max: 20 })
		this.statistics.setStatistic({
			strength: 150,
			attack_speed: 200,
			attack_distance: 100,
			luck: 0,
			max_speed: 200,
		})

		this.body.setMaxSpeed(this.statistics.max_speed)
	}
}
