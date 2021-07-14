# [Procedural Dungeon](https://callan.fr/)

## Table of Contents

- [Installation and Usage](#installation-and-usage)
- [Brief and Tutorial](#brief-and-tutorial)
- [Project Setup](#project-setup)
- [Contributing](#contributing)
- [Release Notes](#release-notes)
- [Liscence](#liscence)

> I decided to start developing Procedural Dungeon again, because the code was
> far too rough.
> New version of [Procedural Dungeon(old)](http://procedural-dungeon.surge.sh)
> You can find [Old repository](https://github.com/AllanCerveaux/Old-Procedural-Dungeon)

## Installation and Usage

> NOTE: Assuming you have at least the latest [Node.js](https://nodejs.org/) [release with long-term](https://nodejs.org/en/about/releases/) support installed.

Dowload and install :

```sh
git clone https://github.com/AllanCerveaux/Procedural-Dungeon
cd Procedural-Dungeon
npm install # or yarn install
```

## Usage

### Generators

#### `object` generator

`npm run object:new <name>`

Create game class object and updates the `objects/<object>/index.js`. This generator will ask which Phaser game object class your want your new game object class to extend from.

- **Arguments**:
  - `name`: The object class name.

#### `scene` generator

`npm run scene:new <name>`

Creates scene classes and updates the `scenes/index.js` module with the new entries.

- **Arguments**:
  - `names`: Required. The name (or names) of the scene class.

## Project Setup

> WIP !

### Features

Projects created with `Phaser 3.24` with [phaser-project-template](https://github.com/yandeu/phaser-project-template/) devlop by [yandeu](https://github.com/yandeu/) have the following features out-of-the-box:

- [Typescript](https://www.typescriptlang.org/).

- [Webpack](https://webpack.js.org/) for better integration of components and dependencies.

- [PWA](https://developer.mozilla.org/fr/docs/Web/Progressive_web_apps) Progressive Web App.

### Application Layout

Media assets and source code are organized in a dedicated `src/` directory.

```
src/
│
├── scripts/            # Where application modules are stored
│   ├── objects/        # Custom extended game objects
│   │   └── ...
│   ├── plugins/        # Custom private plugins
│   │   └── ...
│   ├── scenes/         # Game scenes
│   │   ├── index.js    # Reference module for all game scenes
│   │   └── ...
│   ├── utils/          # Scripts and libs
│   ├── config.js       # Contains certain Phaser configuration values
│   └── index.js        # The game application entry point routine
│
├── assets/             # Static files served by Browsersync
│   ├── img/            # Where game assets are stored
│   ├── sounds/         # Game sounds assets
│   ├── sprites/        # Game sprites characters, enemies...
│   └── tilesets/       # Game tilesets map, objects...
│
├──favicon.ico          # A sample Phaser logo favicon
└── index.html          # Main page template
```

## Contributing

Read the [contribution guidelines](https://github.com/AllanCerveaux/Procedural-Dungeon/blob/master/.github/CONTRIBUTING.md) to learn how you can help `Procedural-Dungeon`.

## Release Notes

Read the [REALEASE_NOTE](https://github.com/AllanCerveaux/Procedural-Dungeon/blob/master/RELEASE_NOTE.md) for info about the latest release.

## License

This software is distributed under the terms of the [MIT License](https://github.com/AllanCerveaux/Procedural-Dungeon/blob/master/LISCENCE.md).

## Credit

Thanks to [yandeu](https://github.com/yandeu/) to make this project template and
A huge thank you to Richard Davey [@photonstorm](https://github.com/photonstorm) for creating Phaser
