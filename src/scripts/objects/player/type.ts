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

// export interface Inventory {
//   items: Item[]
//   activeItem: Item
//   trinket: Item
//   consumable: Item
//   coins: number
// }

// export interface Item {}


export enum PLAYER_EMITTER {
  DAMAGE = "PLAYER_DAMAGE",
  HEAL = "PLAYER_HEAL",
  HEALTH_UP = "PLAYER_HEALTH_UP",
  HEALTH_DOWN = "PLAYER_HEALTH_DOWN",
}

