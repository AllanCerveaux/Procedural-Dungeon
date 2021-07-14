import { Effect } from '../../types'

export class ChannelStrip {
  // private _context: AudioContext
  input: ChannelMergerNode
  gain: GainNode
  private _effects: Effect[] = []

  get effects() {
    return this._effects
  }

  constructor(_context: AudioContext, effect: Effect)
  constructor(_context: AudioContext, effects: Effect[])
  constructor(private _context: AudioContext, fx: any) {
    this.input = this._context.createChannelMerger()
    this.gain = this._context.createGain()

    if (Array.isArray(fx)) {
      this.addEffects(fx)
    } else {
      this.addEffect(fx)
    }
  }

  addEffect(effect: Effect) {
    this._effects.push(effect)
    this.input.disconnect()
    this._effects.forEach((ef) => {
      ef.gain.disconnect()
    })
    const channelFlow = this._effects.reduce((prev_node, ef) => prev_node.connect(ef.input), this.input)
    // channelFlow.connect(this.gain).connect(this._context.destination)
    channelFlow.connect(this.gain)
  }

  addEffects(effects: Effect[]) {
    this._effects = [...this._effects, ...effects]
    this.input.disconnect()
    this._effects.forEach((ef) => {
      ef.gain.disconnect()
    })
    const channelFlow = this._effects.reduce((prev_node, ef) => prev_node.connect(ef.input), this.input)
    // channelFlow.connect(this.gain).connect(this._context.destination)
    channelFlow.connect(this.gain)
  }

  setGain(value: number) {
    this.gain.gain.value = value
  }
}
