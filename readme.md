## everythingstays-cli

CLI for installing and publishing packages to IPFS easily

## Requirements

* NodeJS version 4 or higher
* NPM version 3 or higher
* IPFS version 0.3.11 or higher

NOTE: This is the minimum requirements that has been tested, it might work on lower versions. If it does, please let me know.

## Installation

`npm install -g everythingstays-cli`

Now `es` is in your PATH

### Commands

`install`

Installs shell-scripts in your repository and package.json to run on `npm install` and `npm publish`

`uninstall`

Removes the shell-scripts

### How to publish packages?

* Run `es install` in your repository
* Commit your changes
* Run `npm publish`
* Write down the hash somewhere for people to use

### How to install packages?

* Run `es install` in your repository
* Copy `dependencies` from `package.json` to `esDependencies` in the same file, replacing the version with the hash from `npm publish`
* Commit your changes
* Run `npm install`

