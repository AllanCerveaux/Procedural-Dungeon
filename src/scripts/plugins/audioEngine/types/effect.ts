import { Delay, Distortion, Filter, Pan, Reverb, _3BandEQ } from '../classes/effects'

export enum EffectType {
  _3BandEQ = '_3BandEQ',
  Delay = 'Delay',
  Distortion = 'Distortion',
  Filter = 'Filter',
  Pan = 'Pan',
  Reverb = 'Reverb',
}

export type Effect = _3BandEQ | Delay | Distortion | Filter | Pan | Reverb

export type EffectOptions =
  | BiquadFilterOptions
  | DelayOptions
  | WaveShaperOptions
  | StereoPannerOptions
  | ConvolverOptions
