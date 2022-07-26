import { Heart } from '@objects/hud/heart'
import { OVERLAY } from '@constants'

export class HUDScene extends Phaser.Scene {
  life_bar: Heart[]

  life: {
    heart: number
    extra: number
    max: number
  }
  heart_key: any
  extra_key: any
  remove_heart: any
  remove_extra: any
  constructor() {
    super({ key: OVERLAY.HUD })
    this.life_bar = []
  }

  create({ life }) {
    this.life = life
    this.generateLifeBar()
    this.heart_key = this.input.keyboard.addKey('d')
    this.remove_heart = this.input.keyboard.addKey('f')
    this.extra_key = this.input.keyboard.addKey('e')
    this.remove_extra = this.input.keyboard.addKey('r')
  }

  update(time: number, delta: number): void {
    if (Phaser.Input.Keyboard.JustDown(this.heart_key)) {
      this.addHeart(false, 0)
      console.log(this.life_bar)
    }
    if (Phaser.Input.Keyboard.JustDown(this.extra_key)) {
      this.addHeart(true, 2)
      console.log(this.life_bar)
    }
    if (Phaser.Input.Keyboard.JustDown(this.remove_heart)) {
      this.removeHeart()
      console.log(this.life_bar)
    }
    if (Phaser.Input.Keyboard.JustDown(this.remove_extra)) {
      this.removeHeart(true)
      console.log(this.life_bar)
    }
  }

  generateLifeBar() {
    for (let i = 2; i <= this.life.heart; i += 2) this.addHeart()
    for (let i = 2; i <= this.life.extra; i += 2) this.addHeart(true)
  }

  addHeart(isExtra: boolean = false, state?: number) {
    const x = (this.life_bar.at(-1)?.x || 0) >= 150 ? 30 : (this.life_bar.at(-1)?.x || 0) + 30
    const y = (this.life_bar.at(-1)?.x || 0) >= 150 ? 50 : this.life_bar.at(-1)?.y || 20
    this.life_bar.push(new Heart(this, x, y, isExtra, state))
  }

  removeHeart(isExtra: boolean = false) {
    const { hearts, extra } = this.hearts()
    let rmElm = !isExtra ? hearts.at(-1) : extra.at(-1)

    if (rmElm) {
      if (!rmElm.isExtra) this.rePosHearts()
      rmElm.destroy()
      const rmElmIndex = this.life_bar.indexOf(rmElm)
      this.life_bar = [...this.life_bar.filter((_, i) => i !== rmElmIndex)]
    }
  }

  rePosHearts() {
    for (let i = this.life_bar.length - 1; i >= 0; i--) {
      if (i - 1 >= 0) {
        this.life_bar[i].x = this.life_bar[i - 1].x
        this.life_bar[i].y = this.life_bar[i - 1].y
      }
    }
  }

  hearts() {
    return {
      hearts: this.life_bar.filter(({ isExtra }) => !isExtra),
      extra: this.life_bar.filter(({ isExtra }) => isExtra)
    }
  }
}
