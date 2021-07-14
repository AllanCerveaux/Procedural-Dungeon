import { keepNumberBetwwen } from '../../utils'

export class Pan {
  private _input: ChannelMergerNode
  private _gain: GainNode
  private _node: StereoPannerNode

  constructor(private _context: AudioContext, options: StereoPannerOptions = {}) {
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
    this._input = new ChannelMergerNode(this._context)
    this._gain = new GainNode(this._context)
    this._node = new StereoPannerNode(this._context, options)

    this._input.connect(this._node).connect(this._gain)
  }

  get input() {
    return this._input
  }

  get gain() {
    return this._gain
  }

  setPan(value: number) {
    this._node.pan.value = keepNumberBetwwen(value, -1, 1)
  }

  setGain(value: number) {
    this._gain.gain.value = value
  }
}
