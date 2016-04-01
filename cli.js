#! /usr/bin/env node

const fs = require('fs')
const args = process.argv
const command = args[2]

const config = {
  app_dir: process.env.HOME + '/.stay'
}

try {
  fs.accessSync(config.app_dir, fs.F_OK)
} catch (e) {
  const mkdirp = require('mkdirp')
  mkdirp.sync(config.app_dir)
}

if (!command) {
  require('./cli/help')(args, config)
  process.exit(1)
}

try {
  require('./cli/' + command)(args, config)
} catch (Err) {
  if (Err.code === 'MODULE_NOT_FOUND') {
    console.log('Command "' + command + '" not found')
  } else {
    throw Err
  }
}
