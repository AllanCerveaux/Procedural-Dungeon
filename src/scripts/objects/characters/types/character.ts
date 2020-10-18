import { Item } from '../../items'
import { CharacterActions } from './actions'
import { Direction, State, StatusEffect } from './enums'

export interface Character extends CharacterActions {
  life: {
    heart: number
    max: number
    extra: number
  }
  speed: number
  attackCost: number
  attackSpeed: number
  defenseCost: number
  luck: number
  effect: Effect[]
  inventory: Inventory
  direction: Direction
  state: State
}
export interface Inventory {
  items: Item[]
  activeItem: Item
  trinket: Item
  consumable: Item
  coins: number
}

export interface Effect {
  status: StatusEffect
  timeOfEffect: number
}
