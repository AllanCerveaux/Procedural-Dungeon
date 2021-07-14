export class Filter {
  private _input: ChannelMergerNode
  private _gain: GainNode

  private _node: BiquadFilterNode

  constructor(private _context: AudioContext, options: BiquadFilterOptions = {}) {
    options = { ...{ type: 'lowpass', frequency: 500, Q: 1, detune: 0, gain: 1 }, ...options }
    this._input = new ChannelMergerNode(this._context)
    this._gain = new GainNode(this._context)

    this._node = new BiquadFilterNode(this._context, options)

    this._input.connect(this._node).connect(this._gain)
  }

  get input() {
    return this._input
  }

  get gain() {
    return this._gain
  }

  setFrequency(value: number) {
    this._node.frequency.value = value
  }

  setQ(value: number) {
    this._node.Q.value = value
  }

  setFilterGain(value: number) {
    this._node.gain.value = value
  }

  setGain(value: number) {
    this._gain.gain.value = value
  }
}
