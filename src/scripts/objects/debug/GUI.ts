import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

import { Pane } from 'tweakpane'
import { emitter } from '../../utils/events'

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
      if (x === 0 && y === 0) emitter.emit('health_up', false)
      if (x === 0 && y === 1) emitter.emit('health_down', false)
      if (x === 1 && y === 0) emitter.emit('health_up', true)
      if (x === 1 && y === 1) emitter.emit('health_down', true)
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
      if (x === 0 && y === 0) emitter.emit('heal', 1, false)
      if (x === 0 && y === 1) emitter.emit('damage', 1, false)
      if (x === 1 && y === 0) emitter.emit('heal', 1, true)
      if (x === 1 && y === 1) emitter.emit('damage', 1, true)
    })
}
