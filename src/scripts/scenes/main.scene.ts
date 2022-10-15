import { DEFAULT_HEIGHT, DEFAULT_WIDTH, OVERLAY, SCENES } from '@constants';

import { Elf } from '@objects/heroes/Elf';
import { HUDScene } from './overlay/hud.scene';
import { Knight } from '@objects/heroes/Knight';
import { Lizard } from '@objects/heroes/Lizard';
import { Wizard } from '@objects/heroes/Wizard';
import { PlayerEmitter } from '@utils/events';

export class MainScene extends Phaser.Scene {
  hud: Phaser.Scene;
  player: Knight | Wizard | Elf | Lizard;
  constructor() {
    super({ key: SCENES.MAIN });
  }

  create() {
    this.player = new Knight(this, DEFAULT_WIDTH / 2, DEFAULT_HEIGHT / 2, 'f');

    this.cameras.main.setZoom(2);
    this.cameras.main.startFollow(this.player);

    this.hud = this.scene.add(OVERLAY.HUD, HUDScene, true, {
      player: this.player
    });

    PlayerEmitter.on('game_over', () => {
      this.hud.scene.remove();
      this.scene.restart();
    });
  }

  update(time: number, delta: number): void {
    this.player.update(time, delta);
  }
}
