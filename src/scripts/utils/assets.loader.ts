export class AssetsLoader {
  constructor(private scene: Phaser.Scene) {}

  public init(): void {
    this.loadTilesets()
    this.loadCharacters()
    this.loadObjects()
    this.loadUI()
    this.loadGui()
    this.loadSong()
  }
  private loadAtlas(key: string, path: string): Phaser.Loader.LoaderPlugin {
    return this.scene.load.atlas(key, [`${path}/${key}.png`, `${path}/${key}_n.png`], `${path}/${key}.json`)
  }
  private loadTilesets(): Phaser.Loader.LoaderPlugin {
    return this.loadAtlas('tilesets', 'tilesets')
  }

  private loadCharacters(): Phaser.Loader.LoaderPlugin {
    return this.loadAtlas('characters', 'sprites/characters')
  }

  private loadObjects(): Phaser.Loader.LoaderPlugin {
    return this.loadAtlas('objects', 'sprites/objects')
  }

  private loadUI(): Phaser.Loader.LoaderPlugin {
    return this.loadAtlas('ui', 'gui')
  }

  private loadGui() {
    this.scene.load.spritesheet('start_button', 'gui/StartButton.png', {
      frameWidth: 70,
      frameHeight: 38,
    })
    this.scene.load.spritesheet('options_button', 'gui/OptionsButton.png', {
      frameWidth: 108,
      frameHeight: 40,
    })
    this.scene.load.spritesheet('game_title', 'gui/Gametitle.png', {
      frameWidth: 452,
      frameHeight: 253,
    })
    this.scene.load.image('bg_game_title', 'gui/MapGameTitle.png')
  }

  private loadSong() {}
}
