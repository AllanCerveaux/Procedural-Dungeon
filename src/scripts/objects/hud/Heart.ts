export class Heart extends Phaser.GameObjects.Sprite {
  declare state: number
  isExtra: boolean
  constructor(scene: Phaser.Scene, x: number, y: number, isExtra: boolean = false, state: number = 2) {
    super(scene, x, y, 'ui')
    scene.add.existing(this)
    this.setScale(2)
    this.isExtra = isExtra
    if (isExtra) {
      this.setTint(0xc00baff)
    }
    this.state = state
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta)
    if (this.state === 0) {
      this.setFrame('ui_heart_empty')
    } else if (this.state === 1) {
      this.setFrame('ui_heart_half')
    } else {
      this.setFrame('ui_heart_full')
    }
  }

  /**
   * If the state is less than 1, then return true
   * @returns A boolean value.
   */
  isEmpty(): boolean {
    return this.state < 1
  }

  /**
   * If the state is less than 2, increase the state by 1
   */
  increaseState(cost: number = 1) {
    this.state < 2 ? (this.state += cost) : null
  }

  /**
   * If the state is greater than 0, decrease the state by 1
   */
  decreaseState(cost: number = 1) {
    this.state > 0 ? (this.state -= cost) : null
  }
}
