type Animation = {
	name: string
	frame: number
	repeat: number
}
type Frame = {
	key: string
	frame: string
}
export class AnimationLoader {
	frameName: Frame[] = []
	animations: Animation[] = [
		{ name: 'idle', frame: 4, repeat: -1 },
		{ name: 'run', frame: 4, repeat: -1 },
		{ name: 'hit', frame: 1, repeat: 0 },
	]
	heroes: string[] = ['knight_m', 'knight_f', 'elf_m', 'elf_f', 'wizzard_m', 'wizzard_f', 'lizard_m', 'lizard_f']
	enemies: string[] = [
		'big_demon',
		'big_zombie',
		'chort',
		'goblin',
		'ice_zombie',
		'imp',
		'masked_orc',
		'muddy',
		'necromancer',
		'ogre',
		'orc_shaman',
		'orc_warrior',
		'skelet',
		'swampy',
		'tiny_zombie',
		'wogol',
		'zombie',
	]

	constructor(private scene: Phaser.Scene) {}

	public init(): void {
		this.initializeAnimation()
	}

	private initializeAnimation(): void {
		this.animations.forEach((anim) => {
			this.heroes.forEach((hero) => {
				this.createAnims(hero, anim)
			})
			this.enemies.forEach((enemy) => {
				if (anim.name !== 'hit') {
					this.createAnims(enemy, anim)
					return
				}
			})
		})
	}

	private createAnims(char: string, anim: Animation): void {
		this.generateFrame(char, anim)
		this.scene.anims.create({
			key: `${char}_${anim.name}`,
			frames: this.frameName,
			frameRate: 8,
			repeat: anim.repeat,
		})
		this.frameName = []
	}

	generateFrame(char: string, anim: Animation): void {
		for (let i = 0; i < anim.frame; i++) {
			this.frameName.push({
				key: 'characters',
				frame: `${char}_${anim.name}_anim_f${i}`,
			})
		}
	}
}
