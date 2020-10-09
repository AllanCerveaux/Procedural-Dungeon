import { EffectContext } from '..'
import { keepNumberBetwwen } from '../../utils'

export class Pan {
  private _context: EffectContext
  private _node: StereoPannerNode

  constructor(options: StereoPannerOptions = {}) {
    //   {
    //   // coneInnerAngle?: number;
    //   // coneOuterAngle?: number;
    //   // coneOuterGain?: number;
    //   // distanceModel?: DistanceModelType;
    //   // maxDistance?: number;
    //   // orientationX?: number;
    //   // orientationY?: number;
    //   // orientationZ?: number;
    //   // panningModel?: PanningModelType;
    //   // positionX?: number;
    //   // positionY?: number;
    //   // positionZ?: number;
    //   // refDistance?: number;
    //   // rolloffFactor?: number;
    // }
    options = { ...{ pan: 0 }, ...options }
    this._context = new EffectContext()
    this._node = new StereoPannerNode(this._context.context, options)

    this._context.input.connect(this._node).connect(this._context.gain).connect(this._context.context.destination)
  }

  setPan(value: number) {
    this._node.pan.value = keepNumberBetwwen(value, -1, 1)
  }

  setGain(value: number) {
    this._context.setGain(value)
  }
}
