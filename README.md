# [Procedural Dungeon](https://callan.fr/)

## Table of Contents

- [Procedural Dungeon](#procedural-dungeon)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Project Setup](#project-setup)
    - [Application Layout](#application-layout)
  - [Contributing](#contributing)
  - [Release Notes](#release-notes)
  - [License](#license)
  - [Credit](#credit)

> I decided to start developing Procedural Dungeon again, because the code was
> far too rough.
> New version of [Procedural Dungeon(old)](http://procedural-dungeon.surge.sh)
> You can find [Old repository](https://github.com/AllanCerveaux/Old-Procedural-Dungeon)

## Installation

> NOTE: Assuming you have at least the latest [Node.js](https://nodejs.org/) [release with long-term](https://nodejs.org/en/about/releases/) support installed.

Dowload and install :

```sh
git clone https://github.com/AllanCerveaux/Procedural-Dungeon
cd Procedural-Dungeon
[pnpm|yarn|npm] install
```
## Project Setup

> WIP !

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

A huge thank you to Richard Davey [@photonstorm](https://github.com/photonstorm) for creating Phaser
