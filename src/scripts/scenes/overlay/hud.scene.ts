import { DebugGUI } from '@objects/debug/GUI'
import { FPSText } from '@objects/debug/fpsText'
import { Lifebar } from '@objects/hud/Lifebar'
import { OVERLAY } from '@constants'
export class HUDScene extends Phaser.Scene {
  lifebar: Lifebar
  fps_text: FPSText
  constructor() {
    super({ key: OVERLAY.HUD })
  }

  create({ life }) {
    this.lifebar = new Lifebar(this, 0, 0, life)
    this.fps_text = new FPSText(this, this.cameras.main.width - 240, 0)
    if (process.env.NODE_ENV === 'development') DebugGUI()
  }

  update(time: number, delta: number): void {
    this.fps_text.update()
    this.lifebar.update(time, delta)
  }
}
