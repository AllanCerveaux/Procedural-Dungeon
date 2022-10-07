export default class Statistic extends Phaser.GameObjects.Text {
  statName: string | undefined
  value: number | undefined
  constructor(scene: Phaser.Scene, x: number, y: number, text?: string, style?: Phaser.Types.GameObjects.Text.TextStyle, statName?: string, value?: number) {
    super(scene, x, y, text || '', style || {
      fontFamily: '"Press Start 2P"',
      fontSize: '16px',
      color: 'white',
      align: 'right'
    })
    this.statName = statName
    this.value = value
    
    this.setText(`${statName}: ${value as number / 100}`)
  }

}
