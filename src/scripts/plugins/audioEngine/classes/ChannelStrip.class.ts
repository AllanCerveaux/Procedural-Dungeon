export class ChannelStrip {
  private _context: AudioContext
  input: ChannelMergerNode
  gain: GainNode
  private _nodes: AudioNode[]

  get context() {
    return this._context
  }

  get nodes() {
    return this._nodes
  }

  constructor(nodes: AudioNode[]) {
    this._context = new AudioContext()
    this.input = this._context.createChannelMerger()
    this.gain = this._context.createGain()

    this._nodes = nodes

    const channelFlow = this._nodes.reduce((prev_node, node) => prev_node.connect(node), this.input)
    channelFlow.connect(this.gain).connect(this.context.destination)
  }

  setGain(value: number) {
    this.gain.gain.value = value
  }
}
