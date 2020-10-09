export class EffectContext {
  context: AudioContext
  private _input: ChannelMergerNode
  private _gain: GainNode

  constructor() {
    this.context = new AudioContext()
    this._input = this.context.createChannelMerger()
    this._gain = this.context.createGain()
  }

  get input() {
    return this._input
  }

  get gain() {
    return this._gain
  }

  setGain(value: number) {
    this.gain.gain.value = value
  }
}
