import { Life } from '@game/objects/base/Life'
import { StatisticBase } from '@game/objects/base/Statistics'
import { PlayerBase } from '@game/objects/player/PlayerBase'
import { PLAYER_EMITTER } from '@game/objects/player/type'
import { PlayerEmitter } from '@game/utils/events'
import type { FolderApi, Pane } from 'tweakpane'

const DEFAULT_NUMBER_DISPLAYER_CONFIG = {
	readonly: true,
	format: (value: number) => value.toFixed(0),
}

export function PlayerPanel(panel: Pane, player: PlayerBase) {
	const playerFolder = panel.addFolder({
		title: 'Player',
		expanded: false,
	})

	playerFolder.addBinding(player.body, 'speed', {
		...DEFAULT_NUMBER_DISPLAYER_CONFIG,
		label: 'Body Speed',
	})

	PlayerPanelStatistic(playerFolder, player._statistics)
	PlayerPanelLife(playerFolder, player._life)
}

function PlayerPanelStatistic(playerFolder: FolderApi, statistics: StatisticBase) {
	const statisticFolder = playerFolder.addFolder({
		title: 'Statistics',
		expanded: false,
	})

	statisticFolder.addBinding(statistics, 'attack_distance', {
		...DEFAULT_NUMBER_DISPLAYER_CONFIG,
	})

	statisticFolder.addBinding(statistics, 'attack_speed', {
		...DEFAULT_NUMBER_DISPLAYER_CONFIG,
	})

	statisticFolder.addBinding(statistics, 'luck', {
		...DEFAULT_NUMBER_DISPLAYER_CONFIG,
	})

	statisticFolder.addBinding(statistics, 'speed', {
		...DEFAULT_NUMBER_DISPLAYER_CONFIG,
	})

	statisticFolder.addBinding(statistics, 'strength', {
		...DEFAULT_NUMBER_DISPLAYER_CONFIG,
	})
}

function PlayerPanelLife(playerFolder: FolderApi, life: Life) {
	const lifeFolder = playerFolder.addFolder({
		title: 'Life controller',
		expanded: false,
	})

	lifeFolder.addBinding(life, 'max_total', {
		...DEFAULT_NUMBER_DISPLAYER_CONFIG,
	})

	lifeFolder.addBinding(life, 'heart', {
		...DEFAULT_NUMBER_DISPLAYER_CONFIG,
	})

	lifeFolder.addBinding(life, 'extra', {
		...DEFAULT_NUMBER_DISPLAYER_CONFIG,
	})

	const add_remove = [
		['+1 H', '-1 H'],
		['+1 E', '-1 E'],
	]

	lifeFolder
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

	lifeFolder
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
