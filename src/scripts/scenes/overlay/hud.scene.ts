import { HEART, OVERLAY } from '@constants'

import { Heart } from '@objects/hud/heart'

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
  decrease_key: any
  increase_key: any
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
    this.decrease_key = this.input.keyboard.addKey('z')
    this.increase_key = this.input.keyboard.addKey('a')
  }

  update(time: number, delta: number): void {
    if (Phaser.Input.Keyboard.JustDown(this.heart_key)) {
      this.addHeart(false, HEART.FULL)
      console.log(this.life_bar)
    }
    if (Phaser.Input.Keyboard.JustDown(this.extra_key)) {
      this.addHeart(true, HEART.FULL)
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

    if (Phaser.Input.Keyboard.JustDown(this.decrease_key)) {
      this.lifeDown()
      console.log(this.life_bar)
    }
    if (Phaser.Input.Keyboard.JustDown(this.increase_key)) {
      this.lifeUp()
      console.log(this.life_bar)
    }
  }

  generateLifeBar() {
    for (let i = 2; i <= this.life.heart; i += 2) this.addHeart()
    for (let i = 2; i <= this.life.extra; i += 2) this.addHeart(true)
  }

  addHeart(isExtra: boolean = false, state?: number) {
    const { hearts, extra } = this.hearts()
    let x, y

    if (!isExtra && extra.length > 0 && this.life_bar.length * 2 >= this.life.max) this.removeHeart(true)
    if (this.life_bar.length * 2 >= this.life.max) return

    // @TODO: CAN REFACTO
    if (!isExtra) {
      x = (hearts.at(-1)?.x || 0) >= 150 ? 30 : (hearts.at(-1)?.x || 0) + 30
      y = (hearts.at(-1)?.x || 0) >= 150 ? 50 : hearts.at(-1)?.y || 20
      for (let i = 0; i < extra.length; i++) {
        if ((extra[i].x >= 150 || x >= 150) && extra[i].y === 20) {
          extra[i].x = 30
          extra[i].y = 50
        } else {
          extra[i].x += 30
        }
      }
    } else {
      x = (this.life_bar.at(-1)?.x || 0) >= 150 ? 30 : (this.life_bar.at(-1)?.x || 0) + 30
      y = (this.life_bar.at(-1)?.x || 0) >= 150 ? 50 : this.life_bar.at(-1)?.y || 20
    }

    this.life_bar.push(new Heart(this, x, y, isExtra, state))
  }

  removeHeart(isExtra: boolean = false) {
    const { hearts, extra } = this.hearts()
    let rmElm = !isExtra ? hearts.at(-1) : extra.at(-1)

    if (rmElm) {
      if (!rmElm.isExtra) {
        for (let i = extra.length - 1; i >= 0; i--) {
          extra[i].x = i - 1 < 0 ? rmElm.x : extra[i - 1].x
          extra[i].y = i - 1 < 0 ? rmElm.y : extra[i - 1].y
        }
      }
      rmElm.destroy()
      const rmElmIndex = this.life_bar.indexOf(rmElm)
      this.life_bar = [...this.life_bar.filter((_, i) => i !== rmElmIndex)]
    }
  }

  lifeDown() {
    const { hearts, extra } = this.hearts()
    const last_extra = extra.at(-1)
    if (last_extra) {
      last_extra.decreaseState()
      if (last_extra.isEmpty()) this.removeHeart(true)
    } else {
      hearts
        .filter(heart => !heart.isEmpty())
        .at(-1)
        ?.decreaseState()
    }
  }

  lifeUp() {
    const { hearts, extra } = this.hearts()
    if (extra.length > 0) {
      extra
        .filter(extra => extra.state === HEART.HALF)
        .at(0)
        ?.increaseState()
    } else {
      hearts
        .filter(heart => heart.isEmpty() || heart.state === HEART.HALF)
        .at(0)
        ?.increaseState()
    }
  }

  hearts() {
    return {
      hearts: this.life_bar.filter(({ isExtra }) => !isExtra),
      extra: this.life_bar.filter(({ isExtra }) => isExtra)
    }
  }
}
