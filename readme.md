## es-cli

CLI for installing and publishing packages to IPFS easily

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

