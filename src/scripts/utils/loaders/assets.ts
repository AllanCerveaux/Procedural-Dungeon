// @TODO: IDK why have error on png import, need investigate later

import Character from '@assets/sprites/characters/characters.png';
import NCharacter from '@assets/sprites/characters/characters_n.png';
import CharacterJSON from '@assets/sprites/characters/characters.json';

import Object from '@assets/sprites/objects/objects.png';
import NObject from '@assets/sprites/objects/objects_n.png';
import ObjectJSON from '@assets/sprites/objects/objects.json';

import Tilesets from '@assets/tilesets/tilesets.png';
import NTilesets from '@assets/tilesets/tilesets_n.png';
import TilesetsJSON from '@assets/tilesets/tilesets.json';

import Ui from '@assets/gui/ui.png';
import NUi from '@assets/gui/ui_n.png';
import UiJSON from '@assets/gui/ui.json';

export class AssetsLoader {
  constructor(private scene: Phaser.Scene) {}

  public init(): void {
    this.scene.load.atlas('tilesets', [Tilesets, NTilesets], TilesetsJSON);
    this.scene.load.atlas('objects', [Object, NObject], ObjectJSON);
    this.scene.load.atlas('characters', [Character, NCharacter], CharacterJSON);
    this.scene.load.atlas('ui', [Ui, NUi], UiJSON);
  }
}
