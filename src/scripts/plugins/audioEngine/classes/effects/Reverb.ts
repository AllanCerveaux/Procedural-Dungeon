import { keepNumberBetwwen } from '../../utils'
import { MixChannel } from '../channels'

export class Reverb {
  private _input: ChannelMergerNode
  private _gain: GainNode

  private _dryChannel: MixChannel
  private _effectChannel: MixChannel
  private _node: ConvolverNode

  private _dryWetRatio: number

  constructor(private _context: AudioContext, options: ConvolverOptions = {}, dryWetRatio: number = 0.5) {
    options = { ...{}, ...options }
    this._input = new ChannelMergerNode(this._context)
    this._gain = new GainNode(this._context)
    this._dryChannel = new MixChannel(this._context)
    this._effectChannel = new MixChannel(this._context)
    this.setDryWetRatio(dryWetRatio)
    this._node = new ConvolverNode(this._context, options)
    // {
    //   // buffer?: AudioBuffer | null;
    //   // disableNormalization?: boolean;
    // })

    this._input.connect(this._dryChannel.input).connect(this._dryChannel.gain).connect(this._gain)

    this._input
      .connect(this._effectChannel.input)
      .connect(this._node)
      .connect(this._effectChannel.gain)
      .connect(this._gain)
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

  setGain(value: number) {
    this._gain.gain.value = value
  }
}
