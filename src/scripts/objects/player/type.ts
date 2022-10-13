import { StatisticBase } from "@objects/entities/Statistics";

export enum StatusEffect {
  POISON,
  FROST,
  BURN,
  CHARM,
  FEAR,
  PETRIFIED,
  SLOW,
  CONFUSION,
  BLEED
}

export interface Effect {
  status: StatusEffect
  timeOfEffect: number
}

export interface PlayerStatistic {
  attack_cost: number,
  attack_speed: number,
  defense_cost: number, 
  speed: number, 
  luck: number
}

export type InventoryDefault = {
  items: { 
    item: Item
    quantity: number
  }[]
  size: 10 | number
  activeItem: Item | null
  trinket: Item | null
  consumable: Item | null
}

export type Item = {
  id: number
  type: "active" | "trinket" | "consumable" | "resource"
  name: string
  description: string
  price: number
  drop_chance: number
  buff: ItemCharacteristic
}

export type ItemCharacteristic = {
  can_be_activated: boolean
  timeout: number
  statistic?: StatisticBase
}

export type ItemPool = {
  id: number
  name: string
  items: Item[]
}


export enum PLAYER_EMITTER {
  DAMAGE = "PLAYER_DAMAGE",
  HEAL = "PLAYER_HEAL",
  HEALTH_UP = "PLAYER_HEALTH_UP",
  HEALTH_DOWN = "PLAYER_HEALTH_DOWN",
  PICKUP_ITEM = "PICKUP_ITEM",
  DROP_ITEM = "DROP_ITEM"
}
