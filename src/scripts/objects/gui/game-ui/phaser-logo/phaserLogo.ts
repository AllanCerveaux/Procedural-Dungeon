import { AudioEnginePlugin } from '../../../../plugins/audioEngine/AudioEngine.plugin'
import { SoundPlayer } from '../../../../plugins/audioEngine/classes'
import { ChannelStrip } from '../../../../plugins/audioEngine/classes/channels'
import { EffectType, SoundType } from '../../../../plugins/audioEngine/types'

export class PhaserLogo extends Phaser.Physics.Arcade.Sprite {
  // ae: Phaser.Plugins.BasePlugin
  ae: AudioEnginePlugin
  soundPlayer: SoundPlayer
  effectsChannel: ChannelStrip

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'phaser-logo')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.ae = scene.plugins.get('AudioEngine') as AudioEnginePlugin

    const disto = this.ae.createEffect(EffectType.Distortion)
    this.effectsChannel = this.ae.createChannelStrip('logoEffects', [disto])

    this.soundPlayer = this.ae.createSoundPlayer(
      'logoPlayer',
      {
        bomb: {
          path: '../../../../../assets/sounds/mp3/Bomb_Explosion.mp3',
          type: SoundType.oneShot,
          volume: 1,
        },
      },
      'logoEffects'
    )

    this.setCollideWorldBounds(true)
      .setBounce(0.6)
      .setInteractive()
      .on('pointerdown', () => {
        this.soundPlayer.playSound('bomb')
        this.setVelocityY(-400)
      })
  }
}
