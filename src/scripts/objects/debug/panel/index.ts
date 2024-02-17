import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

import { Pane } from 'tweakpane'
import { PlayerBase } from '../../player/PlayerBase'
import { PlayerPanel } from './player.panel'

export function DebugGUI(scene: Phaser.Scene, player: PlayerBase) {
	const pane = new Pane({
		title: 'Procedural Dungeon Debug',
	})
	pane.registerPlugin(EssentialsPlugin)

	const game_folder = pane.addFolder({
		title: 'Game',
		expanded: false,
	})

	game_folder.addBinding(scene.game.loop, 'actualFps', {
		readonly: true,
		label: 'FPS',
		view: 'graph',
		min: 0,
		max: 120,
	})

	PlayerPanel(pane, player)
}
