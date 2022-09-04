import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

import { Pane } from 'tweakpane'
import Player from "@objects/player/Player";

export function DebugGUI(player: Player) {
  const pane = new Pane({
    title: 'Procedural Dungeon Debug'
  })
  
  PlayerGUI(pane, player)
}

function PlayerGUI(pane: Pane, player: Player) {
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
      if (x === 0 && y === 0) player.health_up(false)
      if (x === 0 && y === 1) player.health_down(false)
      if (x === 1 && y === 0) player.health_up(true)
      if (x === 1 && y === 1) player.health_down(true)
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
      if (x === 0 && y === 0) player.take_heal(1, 'heart')
      if (x === 0 && y === 1) player.take_damage(1, 'heart')
      if (x === 1 && y === 0) player.take_heal(1, 'extra')
      if (x === 1 && y === 1) player.take_damage(1, 'extra')
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
      if (x === 0 && y === 0) player.stat_update('up', 'attack_cost', 10)
      if (x === 0 && y === 1) player.stat_update('down', 'attack_cost', 10)
    })
}
