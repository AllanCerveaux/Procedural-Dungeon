import { DebugGUI } from '@objects/debug/GUI'
import { FPSText } from '@objects/debug/fpsText'
import { Lifebar } from '@objects/hud/Lifebar'
import { OVERLAY } from '@constants'
import { PlayerBase } from '@game/objects/player/PlayerBase'

export class HUDScene extends Phaser.Scene {
	lifebar: Lifebar
	fps_text: FPSText
	constructor() {
		super({ key: OVERLAY.HUD })
	}

	create({ player }: { player: PlayerBase }) {
		this.lifebar = new Lifebar(this, 0, 0, player.life)
		this.fps_text = new FPSText(this, this.cameras.main.width - 240, 0)
		if (process.env.NODE_ENV === 'development') DebugGUI(this, player)
	}

	update(): void {
		this.fps_text.update()
	}
}
