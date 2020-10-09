import { Dic } from '../../../utils/types'
import { Sound, SoundType } from '../types/sound'

export class SoundPlayer {
  private soundsLibrary: Dic<Sound>
  private audioElements: Dic<HTMLAudioElement> = {}

  constructor(sounds: Dic<Sound>) {
    this.soundsLibrary = sounds
  }

  async playSound(name: string, volume = this.soundsLibrary[name].volume) /*: Promise<() => void>*/ {
    const volumeValue = volume

    await this.loadSound(name, volumeValue)
    this.stopSound(name)
    this.audioElements[name].play()
    // return () => this.stopSound(name)
  }

  stopSound(name: string) {
    this.audioElements[name].pause()
    this.audioElements[name].currentTime = 0
  }

  private async loadSound(name: string, volume: number): Promise<void> {
    const sound: Sound = this.soundsLibrary[name]
    if (!this.audioElements[name]) {
      this.audioElements[name] = await this.handleSoundLoading(sound.path)
      this.audioElements[name].loop = sound.type === SoundType.loop ? true : false
      this.audioElements[name].volume = volume
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
