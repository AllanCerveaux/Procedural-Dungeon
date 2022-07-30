export class AssetsLoader {
  constructor(private scene: Phaser.Scene) {}

  public init(): void {
    // this.loadTilesets()
    this.loadCharacters()
    // this.loadObjects()
    this.loadUI()
    this.loadGui()
    // this.loadSong()
  }
  private loadAtlas(key: string): Phaser.Loader.LoaderPlugin {
    return this.scene.load.atlas(key, [`${key}.png`, `${key}_n.png`], `${key}.json`)
  }
  private loadTilesets(): Phaser.Loader.LoaderPlugin {
    return this.loadAtlas('tilesets')
  }

  private loadCharacters(): Phaser.Loader.LoaderPlugin {
    return this.loadAtlas('characters')
  }

  private loadObjects(): Phaser.Loader.LoaderPlugin {
    return this.loadAtlas('objects')
  }

  private loadUI(): Phaser.Loader.LoaderPlugin {
    return this.loadAtlas('ui')
  }

  private loadGui() {
    this.scene.load.spritesheet('start_button', 'StartButton.png', {
      frameWidth: 70,
      frameHeight: 38
    })
    this.scene.load.spritesheet('options_button', 'OptionsButton.png', {
      frameWidth: 108,
      frameHeight: 40
    })
    this.scene.load.spritesheet('game_title', 'Gametitle.png', {
      frameWidth: 452,
      frameHeight: 253
    })
    this.scene.load.image('bg_game_title', 'MapGameTitle.png')
  }

  private loadSong() {}
}
