import { Item } from '../../items'
import { Character, CharacterActionsPlayer, Direction, Effect, Inventory, State } from '../types'

export class Hero extends Phaser.GameObjects.Sprite implements Character, CharacterActionsPlayer {
  life = {
    heart: 0,
    max: 10,
    extra: 0,
  }
  speed = 0
  attackCost = 0
  attackSpeed = 0
  defenseCost = 0
  luck = 0
  effect: Effect[]
  inventory: Inventory
  direction: Direction
  state: State

  constructor(scene: Phaser.Scene, x: number, y: number, config) {
    super(scene, x, y, config.key)
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt)
  }

  heal(): void {}

  getDamage(): void {}

  attack(): void {}

  setEffect(): void {}

  removeEffect(): void {}

  setWeapon(): void {}

  setActiveItem(): void {}

  setItemInInventory(item: Item): void {}

  dropItems(trinket: Item, consumable: Item): void {}

  useConsumable(item: Item): void {}

  useActivableItem(activable: Item): void {}

  talk(): void {}

  die(): void {}
}
