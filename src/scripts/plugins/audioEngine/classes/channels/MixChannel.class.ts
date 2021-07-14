export class MixChannel {
  input: ChannelMergerNode
  gain: GainNode

  constructor(private context: AudioContext) {
    this.input = this.context.createChannelMerger()
    this.gain = this.context.createGain()
    this.input.connect(this.gain)
  }

  setGain(value: number) {
    this.gain.gain.value = value
  }
}
