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

`stay init`

Installs shell-scripts in your repository and package.json to run on `npm install` and `npm publish`

`stay deinit`

Removes the shell-scripts

`stay install`

Install dependencies from the `esDependencies` key in the `package.json`

`stay add module@version`

Adds a module to your `package.json`

`stay connect multiaddr`

Adds a node that will pin your published module when running `npm publish`.

If you have `ipfs daemon` running on a instance, you can run `ipfs id` to get a list of addresses that the daemon is listening to.

Use a public address like this: `stay connect /ip4/10.13.0.5/tcp/4001/ipfs/QmPimdxPFy5K1VdCVfe8JsUd6DpdmKQDTdYCmCfReMQ7YY`

### How to publish packages?

* Run `stay init` in your repository
* Commit your changes
* Run `npm publish`
* Write down the hash somewhere for people to use

### How to install packages?

* Run `stay init` in your repository
* Publish the dependencies you need, you'll get a hash back when publishing.
* Copy `dependencies` from `package.json` to `esDependencies` in the same file, replacing the version with the hash from `npm publish` in the dependency publish
* Commit your changes
* Run `stay install`

