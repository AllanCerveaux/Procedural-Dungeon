export default class LoadAssets
{
  constructor(ctx) {
    this.ctx = ctx;
  }

  init(){
    console.log('assets loaded')
    this.loadTilesets();
    this.loadCharacters();
    this.loadObjects();
    this.loadUI();
    this.loadSong();
  }

  loadTilesets(){
    return this.ctx.load.atlas('tilesets', ['tilesets/tilesets.png', 'tilesets/tilesets_n.png'], 'tilesets/tilesets.json');
  }

  loadCharacters(){
    return this.ctx.load.atlas('characters', ['characters/characters.png', 'characters/characters_n.png'], 'characters/characters.json');
  }

  loadObjects(){
    return this.ctx.load.atlas('objects', ['objects/objects.png', 'objects/objects_n.png'], 'objects/objects.json');
  }

  loadUI(){
    return this.ctx.load.atlas('ui', ['ui/ui.png', 'ui/ui_n.png'], 'ui/ui.json');
  }

  loadSong(){

  }
}
