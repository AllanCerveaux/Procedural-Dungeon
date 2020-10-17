export interface CharacterActions {
  heal(): Phaser.Events.EventEmitter
  getDamage(): Phaser.Events.EventEmitter
  attack(): Phaser.Events.EventEmitter
  dropItems(): Phaser.Events.EventEmitter
  useTrinket(): Phaser.Events.EventEmitter
  useConsumable(): Phaser.Events.EventEmitter
  useActivableItem(): Phaser.Events.EventEmitter
  talk(): Phaser.Events.EventEmitter
}
