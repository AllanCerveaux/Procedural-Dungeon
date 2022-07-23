export enum StatusEffect {
  POISON,
  FROST,
  BURN,
  CHARM,
  FEAR,
  PETERIFIED,
  SLOW,
  CONFUSION,
  BLEED
}

export interface Effect {
  status: StatusEffect
  timeOfEffect: number
}

// export interface Inventory {
//   items: Item[]
//   activeItem: Item
//   trinket: Item
//   consumable: Item
//   coins: number
// }

// export interface Item {}
