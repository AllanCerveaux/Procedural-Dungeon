---
to: <%= objectPath %>
---

export default class <%= h.inflection.classify(name) %> <% if(locals.gameobject){ -%>extend Phaser.GameObjects.<%= h.capitalize(gameobject) %> <% } -%>{

<% if(locals.gameobject === "Sprite") { -%>
  /**
   *  My custom sprite.
   *
   *  @constructor
   *  @class <%= h.inflection.classify(name) %>
   *  @extends Phaser.GameObjects.Sprite
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y) {
    super(scene, x, y, '<%= h.inflection.dasherize(name) %>');

    //  Add this game object to the owner scene.
    scene.children.add(this);
  }
}
<% } -%>

<% if(locals.gameobject === "Image") { -%>
  /**
   *  My custom image.
   *
   *  @constructor
   *  @class <%= h.inflection.classify(name) %>
   *  @extends Phaser.GameObjects.Image
   *  @param {Phaser.Scene} scene - The scene that owns this image.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y) {
    super(scene, x, y, '<%= h.inflection.dasherize(name) %>');

    //  Add this game object to the owner scene.
    scene.children.add(this);
  }
}
<% } -%>

<% if(locals.gameobject === "TileSprite") { -%>
  /**
   *  My custom sprite.
   *
   *  @constructor
   *  @class <%= h.inflection.classify(name) %>
   *  @extends Phaser.GameObjects.TileSprite
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   *  @param {number} width - This tile sprite width.
   *  @param {number} height - This tile sprite height.
   */
  constructor(scene, x, y, width, height) {
    super(scene, x, y, width, height, '<%= h.inflection.dasherize(name) %>');

    //  Add this game object to the owner scene.
    scene.children.add(this);
  }
}
<% } -%>

<% if(locals.gameobject === "Blitter") { -%>
  /**
   *  My custom blitter effect.
   *
   *  @constructor
   *  @class <%= h.inflection.classify(name) %>
   *  @extends Phaser.GameObjects.Blitter
   *  @param {Phaser.Scene} scene - The scene that owns this blitter effect.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y) {
    super(scene, x, y, '<%= h.inflection.dasherize(name) %>');

    //  Add this game object to the owner scene.
    scene.children.add(this);
  }
}
<% } -%>

<% if(locals.gameobject === "Group") { -%>
  /**
   *  My custom group.
   *
   *  @constructor
   *  @class <%= h.inflection.classify(name) %>
   *  @extends Phaser.GameObjects.Group
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   */
  constructor(scene) {
    super(scene);
  }
}
<% } -%>

<% if(locals.gameobject === "Zone") { -%>
  /**
   *  My custom zone.
   *
   *  @constructor
   *  @class <%- h.inflection.classify(name) %>
   *  @extends Phaser.GameObjects.Sprite
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   *  @param {number} [width=1] - This zone width.
   *  @param {number} [height=1] - This zone height.
   */
  constructor(scene, x, y, width = 1, height = 1) {
    super(scene, x, y, width, height);

    //  Add this game object to the owner scene.
    scene.children.add(this);
  }
}
<% } -%>

<% if(locals.gameobject === "DynamicBitmapText") { -%>
  /**
   *  My custom dynamic bitmap text.
   *
   *  @constructor
   *  @class <%= h.inflection.classify(name) %>
   *  @extends Phaser.GameObjects.DynamicBitmapText
   *  @param {Phaser.Scene} scene - The scene that owns this bitmap text.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y) {
    super(scene, x, y, '<%= h.inflection.dasherize(name) %>');

    //  Add this game object to the owner scene.
    scene.children.add(this);
  }
}
<% } -%>

<% if(locals.gameobject === "Graphics") { -%>
  /**
   *  My custom graphic.
   *
   *  @constructor
   *  @class <%= h.inflection.classify(name) %>
   *  @extends Phaser.GameObjects.Sprite
   *  @param {Phaser.Scene} scene - The scene that owns this graphic.
   *  @param {object} [options={}] - Configuration parameters of this graphic.
   *  @param {number} options.x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} options.y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, options = {x: 0, y: 0}) {
    super(scene, options);

    //  Add this game object to the owner scene.
    scene.children.add(this);
  }
}
<% } -%>

<% if(locals.gameobject === "None") { -%>
  /**
   *  My custom object.
   *
   *  @class <%= h.inflection.classify(name) %>
   *  @constructor
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   */
  constructor(scene) {
    //  TODO: Stub.
  }
}
<% } -%>
