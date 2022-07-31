import WebFontLoader from 'webfontloader'

export default class WebFontFile extends Phaser.Loader.File {
  font_names: string | string[]
  service: string
  constructor(loader: Phaser.Loader.LoaderPlugin, font_names: string | string[], service = 'google') {
    super(loader, {
      type: 'webfont',
      key: font_names.toString()
    })

    this.font_names = Array.isArray(font_names) ? font_names : [font_names]
    this.service = service
  }

  load(): void {
    const config = {
      active: () => this.loader.nextFile(this, true)
    }
    switch (this.service) {
      case 'google':
        config[this.service] = {
          families: this.font_names
        }
        break

      default:
        throw new Error('Unsupported font service')
    }

    WebFontLoader.load(config)
  }
}
