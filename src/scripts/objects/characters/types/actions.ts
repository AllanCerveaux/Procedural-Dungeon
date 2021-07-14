import { Item } from '../../items'

export interface CharacterActions {
  heal(): void
  attack(): void
  setEffect(): void
  removeEffect(): void
  getDamage(): void
  die(): void
}

export interface CharacterActionsPlayer {
  setWeapon(): void
  setActiveItem(): void
  setItemInInventory(item: Item): void
  dropItems(trinket: Item, consumable: Item): void
  useConsumable(item: Item): void
  useActivableItem(activable: Item): void
  talk(): void
}
