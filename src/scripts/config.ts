import { DEFAULT_HEIGHT, DEFAULT_PHYSICS, DEFAULT_WIDTH } from '@constants';

import scenes from '@scenes/index';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#1E1E1E',
  fps: {
    smoothStep: true
  },
  render: {
    pixelArt: true
  },
  scene: Object.values(scenes),
  plugins: {},
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  physics: {
    default: DEFAULT_PHYSICS,
    [DEFAULT_PHYSICS]: {
      debug: process.env.NODE_ENV === 'development',
      gravity: { y: 0 }
    }
  }
};

export default config;
