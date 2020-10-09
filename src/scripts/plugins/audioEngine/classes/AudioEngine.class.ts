import 'phaser'
import { MixChannel } from '.'

export interface AudioEngineContexts {
  soundEffectsChannel: MixChannel
  musicChannel: MixChannel
  ambianceChannel: MixChannel
}

export class AudioEngineClass {
  private _masterChannel: MixChannel = new MixChannel()

  private _contexts: AudioEngineContexts = {
    soundEffectsChannel: new MixChannel(),
    musicChannel: new MixChannel(),
    ambianceChannel: new MixChannel(),
  }

  constructor() {
    this._contexts.soundEffectsChannel.context.destination.connect(this._masterChannel.input)
    this._contexts.musicChannel.context.destination.connect(this._masterChannel.input)
    this._contexts.ambianceChannel.context.destination.connect(this._masterChannel.input)
  }
}
