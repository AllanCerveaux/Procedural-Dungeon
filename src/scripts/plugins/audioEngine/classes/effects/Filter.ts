import { EffectContext } from '..'

export class Filter {
  private _context = new EffectContext()
  private _node: BiquadFilterNode

  constructor(options: BiquadFilterOptions = {}) {
    options = { ...{ type: 'lowpass', frequency: 500, Q: 1, detune: 0, gain: 1 }, ...options }
    this._node = new BiquadFilterNode(this._context.context, options)

    this._context.input.connect(this._node).connect(this._context.gain).connect(this._context.context.destination)
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
    this._context.setGain(value)
  }
}
