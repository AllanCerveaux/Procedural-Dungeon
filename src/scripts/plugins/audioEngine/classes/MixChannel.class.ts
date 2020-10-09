export class MixChannel {
  private _context = new AudioContext()
  input: ChannelMergerNode
  gain: GainNode

  get context() {
    return this._context
  }

  constructor() {
    this.input = this._context.createChannelMerger()
    this.gain = this._context.createGain()

    this.input.connect(this.gain).connect(this._context.destination)
  }

  setGain(value: number) {
    this.gain.gain.value = value
  }
}
