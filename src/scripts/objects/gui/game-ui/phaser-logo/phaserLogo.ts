import { AudioEnginePlugin } from '../../../../plugins/audioEngine/AudioEngine.plugin'
import { SoundPlayer } from '../../../../plugins/audioEngine/classes'
import { SoundType } from '../../../../plugins/audioEngine/types'
import { State } from '../../../../plugins/state-machine/types'
export class PhaserLogo extends Phaser.Physics.Arcade.Sprite {
  soundPlayer: SoundPlayer
  // effectsChannel: ChannelStrip
  sm
  keys
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private ae: AudioEnginePlugin = scene.plugins.get('AudioEngine') as AudioEnginePlugin
  ) {
    super(scene, x, y, 'phaser-logo')
    console.log(scene)
    this.keys = this.scene.input.keyboard.createCursorKeys()
    this.sm = scene['stateMachine']
    this.sm.init({
      initial: 'idle',
      states: {
        idle: new IdleState(),
        jump: new JumpState(),
      },
      args: [this.scene, this],
    })

    scene.add.existing(this)
    scene.physics.add.existing(this)

    // const disto = this.ae.createEffect(EffectType.Distortion)
    // this.effectsChannel = this.ae.createChannelStrip('logoEffects', [disto])

    this.soundPlayer = this.ae.createSoundPlayer(
      'logoPlayer',
      {
        bomb: {
          path: '../../../../../assets/sounds/mp3/Bomb_Explosion.mp3',
          type: SoundType.oneShot,
          volume: 1,
        },
      }
      // 'logoEffects'
    )

    this.setCollideWorldBounds(true)
      .setBounce(0.6)
      .setInteractive()
      .on('pointerdown', () => {
        this.soundPlayer.playSound('bomb')
        this.setVelocityY(-400)
      })
  }
  preUpdate(t, dt) {
    super.preUpdate(t, dt)
    this.sm.step()
  }
}

class IdleState extends State {
  enter(scene: Phaser.Scene, character: PhaserLogo): void {
    console.log('idle')
  }
  execute(scene: Phaser.Scene, character: PhaserLogo): void {
    const { left } = character.keys
    if (left.isDown) {
      this.stateMachine.transition('jump')
    }
  }
}

class JumpState extends State {
  enter(scene: Phaser.Scene, hero: PhaserLogo): void {
    console.log('jump enter')
  }
  execute(scene: Phaser.Scene, hero: PhaserLogo): void {
    const { left } = hero.keys
    console.log('jump')
    if (!left.isDown) {
      this.stateMachine.transition('idle')
    }
  }
}
