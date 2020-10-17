import { Item } from '../../items'
import { CharacterActions } from './actions'
import { Direction, State, StatusEffect } from './enums'

export interface Character {
  life: number
  maxLife: number
  speed: number
  attackCost: number
  defense: number
  effect: Effect[]
  inventory: Inventory
  direction: Direction
  actions: CharacterActions
  state: State
}

export interface Inventory {
  items: Item[]
  activeItem: Item
  trinket: Item
  consumable: Item
}

export interface Effect {
  status: StatusEffect
  timeOfEffect: number
}
