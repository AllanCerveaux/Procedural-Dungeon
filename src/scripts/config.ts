import { AudioEnginePlugin } from './plugins/audioEngine/AudioEngine.plugin'
import * as scenes from './scenes'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  render: {
    pixelArt: true,
  },
  scene: Object.values(scenes),
  loader: {
    path: 'assets/',
  },
  plugins: {
    global: [{ key: 'AudioEngine', plugin: AudioEnginePlugin, start: true }],
  },
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
}

export default config
