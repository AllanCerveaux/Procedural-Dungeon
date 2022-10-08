import { DebugGUI } from '@objects/debug/GUI'
import { FPSText } from '@objects/debug/fpsText'
import { Lifebar } from '@objects/hud/Lifebar'
import { OVERLAY } from '@constants'
import Player from "@objects/player/Player";
import Stats from "@objects/hud/Stats";

export class HUDScene extends Phaser.Scene {
  lifebar: Lifebar
  player_stats: Stats
  fps_text: FPSText
  constructor() {
    super({ key: OVERLAY.HUD })
  }

  create({ player }: {player: Player}) {
    this.lifebar = new Lifebar(this, 0, 0, player.life)
    this.player_stats = new Stats(this, 0, 0, player)
    this.fps_text = new FPSText(this, this.cameras.main.width - 240, 0)
    if (process.env.NODE_ENV === 'development') DebugGUI()
  }

  update(time: number, delta: number): void {
    this.fps_text.update()
    this.player_stats.update()
    this.lifebar.update()
  }
}
