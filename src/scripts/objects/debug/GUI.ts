import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

import { Pane } from 'tweakpane'
import { PlayerEmitter } from '@utils/events'
import { PLAYER_EMITTER } from '@game/objects/player/type'
import { PlayerBase } from '../player/PlayerBase'

export function DebugGUI(scene: Phaser.Scene, player: PlayerBase) {
	const pane = new Pane({
		title: 'Procedural Dungeon Debug',
	})
	pane.registerPlugin(EssentialsPlugin)

	const game_folder = pane.addFolder({
		title: 'Game',
	})

	game_folder.addBinding(scene.game.loop, 'actualFps', {
		readonly: true,
		label: 'FPS',
		view: 'graph',
		min: 0,
		max: 120,
	})

	PlayerGUI(pane, player)
}

function PlayerGUI(pane: Pane, player: PlayerBase) {
	const folder = pane.addFolder({
		title: 'Player',
	})

	folder.addBinding(player.body, 'speed', {
		readonly: true,
		label: 'Speed',
	})

	const life_controller = folder.addFolder({
		title: 'Life controller',
		expanded: true,
	})

	life_controller.addBinding(player.life, 'max_total', {
		readonly: true,
	})

	life_controller.addBinding(player.life, 'heart', {
		readonly: true,
	})

	life_controller.addBinding(player.life, 'extra', {
		readonly: true,
	})

	const add_remove = [
		['+1 H', '-1 H'],
		['+1 E', '-1 E'],
	]

	life_controller
		.addBlade({
			view: 'buttongrid',
			size: [2, 2],
			cells: (x: number, y: number) => ({
				title: add_remove[x][y],
			}),
			label: 'Health',
		})
		.on('click', ({ index }: { index: [number, number] }) => {
			const [x, y] = index
			if (x === 0 && y === 0) PlayerEmitter.emit(PLAYER_EMITTER.HEALTH_UP, 'heart')
			if (x === 0 && y === 1) PlayerEmitter.emit(PLAYER_EMITTER.HEALTH_DOWN, 'heart')
			if (x === 1 && y === 0) PlayerEmitter.emit(PLAYER_EMITTER.HEALTH_UP, 'extra')
			if (x === 1 && y === 1) PlayerEmitter.emit(PLAYER_EMITTER.HEALTH_DOWN, 'extra')
		})
	life_controller
		.addBlade({
			view: 'buttongrid',
			size: [2, 2],
			cells: (x: number, y: number) => ({
				title: add_remove[x][y],
			}),
			label: 'Heal\nDamage',
		})
		.on('click', ({ index }: { index: [number, number] }) => {
			const [x, y] = index
			if (x === 0 && y === 0) PlayerEmitter.emit(PLAYER_EMITTER.HEAL, 'heart', 1)
			if (x === 0 && y === 1) PlayerEmitter.emit(PLAYER_EMITTER.DAMAGE, 'heart', 1)
			if (x === 1 && y === 0) PlayerEmitter.emit(PLAYER_EMITTER.HEAL, 'extra', 1)
			if (x === 1 && y === 1) PlayerEmitter.emit(PLAYER_EMITTER.DAMAGE, 'extra', 1)
		})
}
