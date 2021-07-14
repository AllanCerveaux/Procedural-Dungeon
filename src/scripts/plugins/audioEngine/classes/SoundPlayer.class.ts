import { Dic } from '../../../utils/types'
import { Channel, Sound, SoundType } from '../types'

export interface SoundElement {
  htmlAudioElement?: HTMLAudioElement
  mediaElementAudioSourceNode?: MediaElementAudioSourceNode
}

export class SoundPlayer {
  private _audioElements: Dic<SoundElement> = {}

  constructor(private _context: AudioContext, private _soundsLibrary: Dic<Sound>, private _channel: Channel) {
    console.log('this._channel : ', this._channel)
  }

  async playSound(name: string, volume = this._soundsLibrary[name].volume) {
    await this.loadSound(name, volume)
    this.stopSound(name)
    this._audioElements[name].htmlAudioElement.play()
  }

  stopSound(name: string) {
    this._audioElements[name].htmlAudioElement.pause()
    this._audioElements[name].htmlAudioElement.currentTime = 0
  }

  private async loadSound(name: string, volume: number): Promise<void> {
    const sound: Sound = this._soundsLibrary[name]
    if (!this._audioElements[name]) {
      this._audioElements[name] = {}
      this._audioElements[name].htmlAudioElement = await this.handleSoundLoading(sound.path)
      this._audioElements[name].htmlAudioElement.loop = sound.type === SoundType.loop ? true : false
      this._audioElements[name].htmlAudioElement.volume = volume

      this._audioElements[name].mediaElementAudioSourceNode = this._context.createMediaElementSource(
        this._audioElements[name].htmlAudioElement
      )
      this._audioElements[name].mediaElementAudioSourceNode.connect(this._channel.input)
    }
  }

  private async handleSoundLoading(path: string): Promise<HTMLAudioElement> {
    await new Promise((resolve, reject) => {
      const sound = new Audio(path)
      sound.oncanplaythrough = () => {
        resolve(sound)
      }
    })
    return new Promise((resolve, reject) => {
      const sound = new Audio(path)
      sound.oncanplaythrough = () => {
        resolve(sound)
      }
    })
  }
}
