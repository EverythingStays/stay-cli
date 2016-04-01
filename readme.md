## everythingstays-cli

CLI for installing and publishing packages to IPFS easily

## Requirements

* NodeJS version 4 or higher
* NPM version 2 or higher
* IPFS version 0.3.11 or higher

NOTE: This is the minimum requirements that has been tested, it might work on lower versions. If it does/does not, [please let us know](https://github.com/EverythingStays/stay-cli/issues/new).

## Installation

`npm install -g stay-cli`

Now `stay` is in your PATH

### Commands

`init`

Installs shell-scripts in your repository and package.json to run on `npm install` and `npm publish`

`deinit`

Removes the shell-scripts

`install`

Install dependencies from the `esDependencies` key in the `package.json`

`add module@version`

Adds a module to your `package.json`

### How to publish packages?

* Run `stay init` in your repository
* Commit your changes
* Run `npm publish`
* Write down the hash somewhere for people to use

### How to install packages?

* Run `stay init` in your repository
* Copy `dependencies` from `package.json` to `esDependencies` in the same file, replacing the version with the hash from `npm publish`
* Commit your changes
* Run `npm install`

