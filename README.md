# [Procedural Dungeon](https://callan.fr/)

## Table of Contents

* [Installation and Usage](#installation-and-usage)
* [Brief and Tutorial](#brief-and-tutorial)
* [Project Setup](#project-setup)
* [Contributing](#contributing)
* [Release Notes](#release-notes)
* [Liscence](#liscence)

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

## Brief and Tutorial

If you need tutorial for this project you can find from [generator-phaser-plus](https://github.com/rblopes/generator-phaser-plus#generators)

## Project Setup

### Features

Projects created with `Procedural-Dungeon` have the following features out-of-the-box:

* [Gulp](https://github.com/gulpjs/gulp/), a lean and simple task manager.

* [Webpack](https://webpack.js.org/) for better integration of components and dependencies.

* [Browsersync](http://www.browsersync.io/) for cross-device testing.

* [Babel](https://babeljs.io/), with `[babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)`, for authoring scripts using the most recent ECMAScript specification features and syntax additions ensuring compatibility with current browsers and devices.

### Application Layout

Media assets and source code are organized in a dedicated `app/` directory.

```
app/
│
├── scripts/            # Where application modules are stored
│   ├── objects/        # Custom extended game objects
│   │   └── ...
│   ├── plugins/        # Custom private plugins
│   │   └── ...
│   ├── scenes/         # Game scenes
│   │   ├── index.js    # Reference module for all game scenes
│   │   └── ...
│   ├── config.js       # Contains certain Phaser configuration values
│   └── index.js        # The game application entry point routine
│
├── static/             # Static files served by Browsersync
│   ├── assets/         # Where game assets are stored
│   │   └── ...
│   └── favicon.ico     # A sample Phaser logo favicon
│
└── index.html          # Main page template
```

## Contributing
Read the [contribution guidelines](https://github.com/AllanCerveaux/Procedural-Dungeon/blob/master/.github/CONTRIBUTING.md) to learn how you can help `Procedural-Dungeon`.

## Release Notes

Read the [news page](https://github.com/AllanCerveaux/Procedural-Dungeon/blob/master/RELEASE_NOTES.md) for info about the latest release.

## License

This software is distributed under the terms of the [MIT License](https://github.com/AllanCerveaux/Procedural-Dungeon/blob/master/LISCENCE.md).
