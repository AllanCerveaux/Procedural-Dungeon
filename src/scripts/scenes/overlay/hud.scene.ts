import { Lifebar } from '@objects/hud/Lifebar'
import { OVERLAY } from '@constants'

export class HUDScene extends Phaser.Scene {
  lifebar: Lifebar
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
    this.lifebar = new Lifebar(this, 0, 0, { max: this.life.max })
    this.heart_key = this.input.keyboard.addKey('d')
    this.remove_heart = this.input.keyboard.addKey('f')
    this.extra_key = this.input.keyboard.addKey('e')
    this.remove_extra = this.input.keyboard.addKey('r')
    this.decrease_key = this.input.keyboard.addKey('z')
    this.increase_key = this.input.keyboard.addKey('a')
    this.generateLifeBar()
    console.log(this.lifebar)
  }

  update(time: number, delta: number): void {
    this.lifebar.update(time, delta)
    if (Phaser.Input.Keyboard.JustDown(this.heart_key)) {
      this.lifebar.health_up(false)
      console.log('add heart', this.lifebar)
    }
    if (Phaser.Input.Keyboard.JustDown(this.extra_key)) {
      this.lifebar.health_up(true)
      console.log('add extra heart', this.lifebar.list)
    }
    if (Phaser.Input.Keyboard.JustDown(this.remove_heart)) {
      this.lifebar.health_down(false)
      console.log('remove heart', this.lifebar.list)
    }
    if (Phaser.Input.Keyboard.JustDown(this.remove_extra)) {
      this.lifebar.health_down(true)
      console.log('add extra heart', this.lifebar.list)
    }

    if (Phaser.Input.Keyboard.JustDown(this.decrease_key)) {
      this.lifebar.damage()
      console.log('decrease heart', this.lifebar.list)
    }
    if (Phaser.Input.Keyboard.JustDown(this.increase_key)) {
      this.lifebar.heal()
      console.log('decrease heart', this.lifebar.list)
    }
  }

  generateLifeBar() {
    const total_of_hearts = this.life.heart + this.life.extra
    for (let i = 2; i <= total_of_hearts; i += 2) {
      const isExtra = i > this.life.heart
      this.lifebar.health_up(isExtra)
    }
  }
}
