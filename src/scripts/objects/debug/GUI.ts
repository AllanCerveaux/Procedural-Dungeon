import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

import { Pane } from 'tweakpane'
import Player from "@objects/player/Player";
import {PlayerEmitter} from "@utils/events";
import {PLAYER_EMITTER} from "@objects/player/type";
import {STATS_EMITTER} from "@objects/hud/Stats";

export function DebugGUI() {
  const pane = new Pane({
    title: 'Procedural Dungeon Debug'
  })
  
  PlayerGUI(pane)
}

function PlayerGUI(pane: Pane) {
  pane.registerPlugin(EssentialsPlugin)
  const folder = pane.addFolder({
    title: 'Player'
  })
  
  const life_controller = folder.addFolder({
    title: 'Life controller',
    expanded: false
  })
  const add_remove = [
    ['+1 H', '-1 H'],
    ['+1 E', '-1 E']
  ]
  
  const stats_controller = folder.addFolder({title: 'Stats Controller', expanded: false})
  const stat_up_down = [
    ['+1', '-1']
  ]
  
  life_controller
    .addBlade({
      view: 'buttongrid',
      size: [2, 2],
      cells: (x, y) => ({
        title: add_remove[x][y]
      }),
      label: 'Health'
    })
    .on('click', ({ index }) => {
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
      cells: (x, y) => ({
        title: add_remove[x][y]
      }),
      label: 'Heal\nDamage'
    })
    .on('click', ({ index }) => {
      const [x, y] = index
      if (x === 0 && y === 0) PlayerEmitter.emit(PLAYER_EMITTER.HEAL, 1, 'heart')
      if (x === 0 && y === 1) PlayerEmitter.emit(PLAYER_EMITTER.DAMAGE, 1, 'heart')
      if (x === 1 && y === 0) PlayerEmitter.emit(PLAYER_EMITTER.HEAL, 1, 'extra')
      if (x === 1 && y === 1) PlayerEmitter.emit(PLAYER_EMITTER.DAMAGE, 1, 'extra')
    })
  
  stats_controller
    .addBlade({
      view: 'buttongrid',
      size: [1, 2],
      cells: (x, y) => ({
        title: stat_up_down[x][y]
      }),
      label: 'attack'
    })
    .on('click', ({ index }) => {
      const [x, y] = index
      if (x === 0 && y === 0) PlayerEmitter.emit(STATS_EMITTER.STATS_CHANGE, 'up', 'strength', 100)
      if (x === 0 && y === 1) PlayerEmitter.emit(STATS_EMITTER.STATS_CHANGE, 'down', 'strength', 100)
    })
}
