import { Anim } from './types'

export class AnimationLoader {
  frameName = []
  anims: Anim[] = [
    { name: 'idle', frame: 4, repeat: -1 },
    { name: 'run', frame: 4, repeat: -1 },
    { name: 'hit', frame: 1, repeat: 0 },
  ]
  heroes: string[] = ['knight_m', 'knight_f', 'elf_m', 'elf_f', 'wizzard_m', 'wizzard_f', 'lizard_m', 'lizard_f']
  ennemies: string[] = [
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
    this.guiAnimation()
  }

  private initializeAnimation(): void {
    this.anims.forEach((anim) => {
      this.heroes.forEach((hero) => {
        this.createAnims(hero, anim)
      })
      this.ennemies.forEach((ennemy) => {
        if (anim.name !== 'hit') {
          this.createAnims(ennemy, anim)
          return
        }
      })
    })
  }

  private createAnims(char: string, anim: Anim): void {
    this.generateFrame(char, anim)
    this.scene.anims.create({
      key: `${char}_${anim.name}`,
      frames: this.frameName,
      frameRate: 8,
      repeat: anim.repeat,
    })
    this.frameName = []
  }

  generateFrame(char: string, anim: Anim): void {
    for (let i = 0; i < anim.frame; i++) {
      this.frameName.push({ key: 'characters', frame: `${char}_${anim.name}_anim_f${i}` })
    }
  }

  guiAnimation() {
    this.scene.anims.create({
      key: 'start_pressed',
      frames: this.scene.anims.generateFrameNumbers('start_button', { start: 0, end: 1 }),
      frameRate: 4,
      repeat: 0,
    })
    this.scene.anims.create({
      key: 'options_pressed',
      frames: this.scene.anims.generateFrameNumbers('options_button', { start: 0, end: 1 }),
      frameRate: 4,
      repeat: 0,
    })
    this.scene.anims.create({
      key: 'game_title_play',
      frames: this.scene.anims.generateFrameNumbers('game_title', { start: 0, end: 8 }),
      frameRate: 8,
      repeat: -1,
    })
  }
}
