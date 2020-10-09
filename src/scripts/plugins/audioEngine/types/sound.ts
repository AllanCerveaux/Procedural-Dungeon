import { Dic } from '../../../utils/types'

export interface Sound {
  path: string
  type: SoundType
  volume: number
}

export enum SoundType {
  oneShot = 'oneShot',
  loop = 'loop',
}

export type SoundsLibrary = Dic<Sound>
