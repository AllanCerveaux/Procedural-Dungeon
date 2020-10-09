import { EffectContext } from '..'
import { makeDistortionCurve } from '../../utils'

export class Distortion {
  private _context = new EffectContext()
  private _node: WaveShaperNode

  constructor(options: WaveShaperOptions = {}) {
    options = { ...{ curve: makeDistortionCurve(), oversample: '2x' }, ...options }
    this._node = new WaveShaperNode(this._context.context, options)

    this._context.input.connect(this._node).connect(this._context.gain).connect(this._context.context.destination)
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
    this._context.setGain(value)
  }
}
