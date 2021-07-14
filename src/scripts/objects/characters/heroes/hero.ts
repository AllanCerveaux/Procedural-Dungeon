import { StateMachinePlugin } from '../../../plugins/state-machine/StateMachine.plugin'
import { Item } from '../../items'
import { Character, CharacterActionsPlayer, Direction, Effect, Inventory, State } from '../types'
import { ActiveItem, AttackState, IdleState, MoveState, SupportItem } from './states'
export class Hero extends Phaser.GameObjects.Sprite implements Character, CharacterActionsPlayer {
  life = {
    heart: 0,
    max: 10,
    extra: 0,
  }
  attackCost = 0
  attackSpeed = 0
  defenseCost = 0
  luck = 0
  effect: Effect[]
  inventory: Inventory
  direction: Direction
  state: State
  private stateMachine: StateMachinePlugin
  public keys
  public config
  private _speed: number

  constructor(scene: Phaser.Scene, x: number, y: number, config: any) {
    super(scene, x, y, config.key)
    this.config = config
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)

    this.setFrame(`${config.hero}_idle_anim_f0`)
    this.anims.play(`${config.hero}_idle`)

    this.keys = scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes['LEFT'],
      right: Phaser.Input.Keyboard.KeyCodes['RIGHT'],
      up: Phaser.Input.Keyboard.KeyCodes['UP'],
      down: Phaser.Input.Keyboard.KeyCodes['DOWN'],
      fire: Phaser.Input.Keyboard.KeyCodes['X'],
      activeItem: Phaser.Input.Keyboard.KeyCodes['SPACE'],
      supportItem: Phaser.Input.Keyboard.KeyCodes['W'],
      fullscreen: Phaser.Input.Keyboard.KeyCodes['F'],
      pause: Phaser.Input.Keyboard.KeyCodes['P'],
    })
    this.speed = 100

    /**
     *  @TODO Find the way to implement plugin name property in Phaser.Scene namespace.
     */
    this.stateMachine = (scene as Phaser.Scene & { statemachine: StateMachinePlugin }).statemachine
    this.stateMachine.init({
      initial: 'idle',
      states: {
        idle: new IdleState(),
        move: new MoveState(),
        attack: new AttackState(),
        activeItem: new ActiveItem(),
        supportItem: new SupportItem(),
      },
      args: [this.scene, this],
    })
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta)
    this.stateMachine.step()
  }

  get speed(): number {
    return this._speed
  }

  set speed(payload: number) {
    this._speed = payload
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
