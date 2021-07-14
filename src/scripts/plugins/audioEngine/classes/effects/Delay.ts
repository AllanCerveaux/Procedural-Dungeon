import { keepNumberBetwwen } from '../../utils'
import { MixChannel } from '../channels'

export class Delay {
  private _input: ChannelMergerNode
  private _gain: GainNode

  private _dryChannel: MixChannel
  private _effectChannel: MixChannel
  private _node: DelayNode

  private _dryWetRatio: number

  constructor(private _context: AudioContext, options: DelayOptions = {}, dryWetRatio: number = 0.5) {
    options = { ...{ delayTime: 0.5 }, ...options }
    this._input = new ChannelMergerNode(this._context)
    this._gain = new GainNode(this._context)

    this._dryChannel = new MixChannel(this._context)
    this._effectChannel = new MixChannel(this._context)
    this.setDryWetRatio(dryWetRatio)
    this._node = new DelayNode(this._context, options)

    this._input.connect(this._dryChannel.input).connect(this._dryChannel.gain).connect(this._gain)

    this._input
      .connect(this._effectChannel.input)
      .connect(this._node)
      .connect(this._effectChannel.gain)
      .connect(this._gain)

    this._gain.connect(this._context.destination)
  }

  get input() {
    return this._input
  }

  get gain() {
    return this._gain
  }

  setDryWetRatio(ratio: number) {
    this._dryWetRatio = keepNumberBetwwen(ratio, 0, 1)
    this._dryChannel.gain.gain.value = 1 - this._dryWetRatio
    this._effectChannel.gain.gain.value = this._dryWetRatio
  }

  setDelayTime(time: number) {
    this._node.delayTime.value = time
  }

  setGain(value: number) {
    this._gain.gain.value = value
  }
}
