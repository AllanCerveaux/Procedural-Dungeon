import 'phaser'
import { Dic } from '../../utils/types'
import { SoundPlayer } from './classes'
import { ChannelStrip, MixChannel } from './classes/channels'
import { Delay, Distortion, Filter, Pan, Reverb, _3BandEQ, _3BandEQBreakPoints } from './classes/effects'
import { Effect, EffectOptions, EffectType, Sound } from './types'

export interface EngineContexts {
  soundEffectsChannel: MixChannel
  musicChannel: MixChannel
  ambianceChannel: MixChannel
}

export enum EngineMixChannels {
  soundEffectsChannel = 'soundEffectsChannel',
  musicChannel = 'musicChannel',
  ambianceChannel = 'ambianceChannel',
}

export class AudioEnginePlugin extends Phaser.Plugins.BasePlugin {
  private _masterContext: AudioContext = new AudioContext()
  private _masterChannel: MixChannel = new MixChannel(this._masterContext)
  private _mixChannels: EngineContexts = {
    soundEffectsChannel: new MixChannel(this._masterContext),
    musicChannel: new MixChannel(this._masterContext),
    ambianceChannel: new MixChannel(this._masterContext),
  }

  _channelStrips: Dic<ChannelStrip> = {}
  _soundPlayers: Dic<SoundPlayer> = {}

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager)

    this._mixChannels.soundEffectsChannel.gain.connect(this._masterChannel.input)
    this._mixChannels.musicChannel.gain.connect(this._masterChannel.input)
    this._mixChannels.ambianceChannel.gain.connect(this._masterChannel.input)
    this._masterChannel.gain.connect(this._masterContext.destination)
  }

  get master() {
    return this._masterChannel
  }

  get mixChannels() {
    return this._mixChannels
  }

  get channelStrips() {
    return this._channelStrips
  }

  createSoundPlayer(playerName: string, sounds: Dic<Sound>, mixChannelName?: EngineMixChannels): SoundPlayer
  createSoundPlayer(playerName: string, sounds: Dic<Sound>, channelStripName?: string): SoundPlayer
  createSoundPlayer(
    playerName: string,
    sounds: Dic<Sound>,
    channelName: any = EngineMixChannels.soundEffectsChannel
  ): SoundPlayer {
    this._soundPlayers[playerName] = new SoundPlayer(
      this._masterContext,
      sounds,
      Object.keys(this._mixChannels).some((key) => key === channelName)
        ? this._mixChannels[channelName]
        : this._channelStrips[channelName]
    )

    return this._soundPlayers[playerName]
  }

  createEffect(effectType: EffectType, breakpoints?: _3BandEQBreakPoints)
  createEffect(effectType: EffectType, effectOptions?: EffectOptions)
  createEffect(effectType: EffectType, options: any = {}) {
    if (effectType === EffectType.Delay) {
      return new Delay(this._masterContext, options)
    } else if (effectType === EffectType.Distortion) {
      return new Distortion(this._masterContext, options)
    } else if (effectType === EffectType.Filter) {
      return new Filter(this._masterContext, options)
    } else if (effectType === EffectType.Pan) {
      return new Pan(this._masterContext, options)
    } else if (effectType === EffectType.Reverb) {
      return new Reverb(this._masterContext, options)
    } else if (effectType === EffectType._3BandEQ) {
      return new _3BandEQ(this._masterContext, options)
    }
  }

  createChannelStrip(channelName: string, effects?: Effect[], mixChannelName?: EngineMixChannels): ChannelStrip
  createChannelStrip(channelName: string, effects?: Effect[], channelStripName?: string): ChannelStrip
  createChannelStrip(
    name: string,
    effects: Effect[] = [],
    channelName: any = EngineMixChannels.soundEffectsChannel
  ): ChannelStrip {
    this._channelStrips[name] = new ChannelStrip(this._masterContext, effects)
    // this._channelStrips[name].context.destination.connect(
    this._channelStrips[name].gain.connect(
      Object.keys(this._mixChannels).some((key) => key === channelName)
        ? this._mixChannels[channelName].input
        : this._channelStrips[channelName].input
    )

    return this._channelStrips[name]
  }
}
