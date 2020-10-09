import { EffectContext, MixChannel } from '..'
import { keepNumberBetwwen } from '../../utils'

export class Reverb {
  private _dryChannel = new MixChannel()
  private _effectChannel = new MixChannel()
  private _context: EffectContext
  private _node: ConvolverNode

  private _dryWetRatio: number

  constructor(options: ConvolverOptions = {}, dryWetRatio: number = 0.5) {
    options = { ...{}, ...options }
    this.setDryWetRatio(dryWetRatio)
    this._context = new EffectContext()
    this._node = new ConvolverNode(this._context.context, options)
    // {
    //   // buffer?: AudioBuffer | null;
    //   // disableNormalization?: boolean;
    // })

    this._context.input.connect(this._dryChannel.input).connect(this._dryChannel.gain).connect(this._context.gain)

    this._context.input
      .connect(this._effectChannel.input)
      .connect(this._node)
      .connect(this._effectChannel.gain)
      .connect(this._context.gain)

    this._context.gain.connect(this._context.context.destination)
  }

  setDryWetRatio(ratio: number) {
    this._dryWetRatio = keepNumberBetwwen(ratio, 0, 1)
    this._dryChannel.gain.gain.value = 1 - this._dryWetRatio
    this._effectChannel.gain.gain.value = this._dryWetRatio
  }

  setGain(value: number) {
    this._context.setGain(value)
  }
}
