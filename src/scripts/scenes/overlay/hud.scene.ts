import { Heart } from '@objects/hud/heart'
import { OVERLAY } from '@constants'

export class HUDScene extends Phaser.Scene {
  life_bar: Phaser.GameObjects.Container
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
  }

  create({ life }) {
    this.life = life
    this.life_bar = this.add.container(30, 20)
    this.heart_key = this.input.keyboard.addKey('d')
    this.remove_heart = this.input.keyboard.addKey('f')
    this.extra_key = this.input.keyboard.addKey('e')
    this.remove_extra = this.input.keyboard.addKey('r')
    this.decrease_key = this.input.keyboard.addKey('z')
    this.increase_key = this.input.keyboard.addKey('a')

    this.generateLifeBar()
    ;(this.life_bar.getAll('isExtra', true).at(-1) as Heart).state = 1
  }

  update(time: number, delta: number): void {
    if (Phaser.Input.Keyboard.JustDown(this.heart_key)) {
      this.addHeart()
      console.log('add heart', this.life_bar.list)
    }
    if (Phaser.Input.Keyboard.JustDown(this.extra_key)) {
      this.addHeart(true)
      console.log('add extra heart', this.life_bar.list)
    }
    if (Phaser.Input.Keyboard.JustDown(this.remove_heart)) {
      this.removeHeart()
      console.log('remove heart', this.life_bar.list)
    }
    if (Phaser.Input.Keyboard.JustDown(this.remove_extra)) {
      this.removeHeart(true)
      console.log('add extra heart', this.life_bar.list)
    }

    if (Phaser.Input.Keyboard.JustDown(this.decrease_key)) {
      console.log('decrease heart', this.life_bar.list)
    }
    if (Phaser.Input.Keyboard.JustDown(this.increase_key)) {
      console.log('decrease heart', this.life_bar.list)
    }
  }
  generateLifeBar() {
    const total_of_hearts = this.life.heart + this.life.extra
    let x = this.life_bar.x
    let y = this.life_bar.y
    for (let i = 2; i <= total_of_hearts; i += 2) {
      const isExtra = i > this.life.heart
      const last_item = this.life_bar.last as Heart

      if (last_item) {
        const { pX, pY } = this.calcPos(x, y)
        x = pX
        y = pY
      }
      this.life_bar.add(new Heart(this, x, y, isExtra))
    }
  }

  addHeart(isExtra: boolean = false) {
    const last_item = this.life_bar.last as Heart

    if (!isExtra && last_item && last_item.isExtra && this.life_bar.length * 2 >= this.life.max) {
      this.removeHeart(true)
    }
    if (this.life_bar.length * 2 >= this.life.max) return

    const adding_heart = new Heart(this, 30, 20, isExtra)

    if (!isExtra) {
      this.life_bar.addAt(adding_heart, 0)
      adding_heart.x = 30
      adding_heart.y = 20
      this.rePositioningHearts(this.life_bar.getAll() as Heart[])
    } else {
      const first_extra_hearts = this.life_bar.getFirst('isExtra', true) as Heart
      this.life_bar.addAt(adding_heart, this.life_bar.getIndex(first_extra_hearts))
      adding_heart.x = first_extra_hearts.x
      adding_heart.y = first_extra_hearts.y
      this.rePositioningHearts(this.life_bar.getAll('isExtra', true) as Heart[])
    }
  }

  removeHeart(isExtra: boolean = false) {
    const arr = this.life_bar.getAll('isExtra', isExtra)
    const last_heart = arr[arr.length - 1]
    this.life_bar.removeAt(this.life_bar.getIndex(last_heart), true)
    if (!isExtra) {
      const arr_extra = this.life_bar.getAll('isExtra', true) as Heart[]
      for (let i = arr_extra.length - 1; i >= 0; i--) {
        arr_extra[i].x = arr_extra[i].x - 30 <= 0 ? 150 : arr_extra[i].x - 30
        arr_extra[i].y = arr_extra[i].x === 150 ? 20 : arr_extra[i].y
      }
    }
  }

  rePositioningHearts(arr: Heart[]) {
    arr.forEach((heart: Heart, i: number) => {
      if (i < 1) return
      const { pX, pY } = this.calcPos(heart.x, heart.y)
      heart.x = pX
      heart.y = pY
    })
  }

  calcPos(x, y) {
    return {
      pX: x >= 150 ? 30 : x + 30,
      pY: x >= 150 ? 50 : y
    }
  }
}
