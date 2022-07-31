import { DebugGUI } from '@objects/debug/GUI'
import { Lifebar } from '@objects/hud/Lifebar'
import { OVERLAY } from '@constants'
export class HUDScene extends Phaser.Scene {
  lifebar: Lifebar
  constructor() {
    super({ key: OVERLAY.HUD })
  }

  create({ life }) {
    this.lifebar = new Lifebar(this, 0, 0, life)
    if (process.env.NODE_ENV === 'development') DebugGUI()
  }

  update(time: number, delta: number): void {
    this.lifebar.update(time, delta)
  }
}
