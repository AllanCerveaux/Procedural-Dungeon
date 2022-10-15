import Player from '@objects/player/Player';

export class Lizard extends Player {
  constructor(scene: Phaser.Scene, x: number, y: number, gender: string) {
    const name = `lizard_${gender}`;

    super(scene, x, y, { key: 'characters', name });

    this.life.setLife({ heart: 0, extra: 6, max: 20 });
    this.statistics.setStatistic({
      strength: 200,
      attack_speed: 180,
      attack_distance: 200,
      luck: 0,
      max_speed: 150
    });
  }
}
