import { makeDistortionCurve } from '../../utils'

export class Distortion {
  private _input: ChannelMergerNode
  private _gain: GainNode

  private _node: WaveShaperNode

  constructor(private _context: AudioContext, options: WaveShaperOptions = {}) {
    options = { ...{ curve: makeDistortionCurve(), oversample: '2x' }, ...options }
    this._input = new ChannelMergerNode(this._context)
    this._gain = new GainNode(this._context)

    this._node = new WaveShaperNode(this._context, options)

    this._input.connect(this._node).connect(this._gain)
  }

  get input() {
    return this._input
  }

  get gain() {
    return this._gain
  }

  setCurve(amount: number)
  setCurve(curve: number[])
  setCurve(curve: Float32Array)
  setCurve(input: any) {
    if (typeof input === 'number') {
      this._node.curve = makeDistortionCurve(input)
    } else {
      this._node.curve = input
    }
  }

  setOversample(oversample: OverSampleType) {
    this._node.oversample = oversample
  }

  setGain(value: number) {
    this._gain.gain.value = value
  }
}
