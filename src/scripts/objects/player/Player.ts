import { PlayerEmitter } from '@utils/events';
import { Item, PLAYER_EMITTER } from '@objects/player/type';
import { STATS_EMITTER } from '@objects/hud/Stats';
import Base from '@objects/entities/Base';
import { LifeDamageOrHealType } from '@objects/entities/Life';
import { Inventory } from '@objects/entities/Inventory';
import { StatisticsType } from '@objects/entities/Statistics';

export default class Player extends Base {
  inventory: Inventory;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    { key, name }: { key: string; name: string }
  ) {
    super(scene, x, y, { key, name, type: 'player' });
    this.inventory = new Inventory();

    PlayerEmitter.on(PLAYER_EMITTER.DAMAGE, (cost: number, isExtra: boolean) =>
      this.hit(cost, isExtra ? 'extra' : 'heal')
    );
    PlayerEmitter.on(PLAYER_EMITTER.HEAL, (cost: number, isExtra: boolean) =>
      this.heal(cost, isExtra ? 'extra' : 'heal')
    );
    PlayerEmitter.on(PLAYER_EMITTER.HEALTH_UP, (type: LifeDamageOrHealType) =>
      this.life.increase(type, 2)
    );
    PlayerEmitter.on(PLAYER_EMITTER.HEALTH_DOWN, (type: LifeDamageOrHealType) =>
      this.life.decrease(type, 2)
    );
    PlayerEmitter.on(PLAYER_EMITTER.PICKUP_ITEM, (item: Item, quantity = 1) =>
      this.inventory.add(item, quantity)
    );
    PlayerEmitter.on(
      PLAYER_EMITTER.DROP_ITEM,
      (item: Item, quantity = 1, isDropped = false) =>
        this.inventory.remove(item, quantity, isDropped)
    );
    PlayerEmitter.on(
      STATS_EMITTER.STATS_CHANGE,
      (state: 'UP' | 'DOWN', name: StatisticsType, cost: number) =>
        this.updateStatistic(state, name, cost)
    );
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    if (this.life.heart + this.life.extra < 1) this.game_over();
  }

  game_over() {
    PlayerEmitter.emit('game_over');
  }
}
