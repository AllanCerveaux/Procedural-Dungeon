export enum StatusEffect {
	POISON,
	FROST,
	BURN,
	CHARM,
	FEAR,
	PETRIFIED,
	SLOW,
	CONFUSION,
	BLEED,
}

export type Effect = {
	status: StatusEffect
	timeOfEffect: number
}

export type PlayerStatistic = {
	attack_cost: number
	attack_speed: number
	defense_cost: number
	speed: number
	luck: number
}

export const MAX_HEART = 20

// export interface Inventory {
//   items: Item[]
//   activeItem: Item
//   trinket: Item
//   consumable: Item
//   coins: number
// }

// export interface Item {}

export enum PLAYER_EMITTER {
	DAMAGE = 'PLAYER_DAMAGE',
	HEAL = 'PLAYER_HEAL',
	HEALTH_UP = 'PLAYER_HEALTH_UP',
	HEALTH_DOWN = 'PLAYER_HEALTH_DOWN',
}
