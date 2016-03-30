#! /usr/bin/env node

const args = process.argv
const command = args[2]

const config = {
  app_dir: process.env.HOME + '/.stay'
}

if (!command) {
  require('./cli/help')(args, config)
  process.exit(1)
}

try {
  require('./cli/' + command)(args, config)
} catch (err) {
  console.log(err)
  if (err.code === 'MODULE_NOT_FOUND') {
    console.log('Command "' + command + '" not found')
  } else {
    throw new Error(err)
  }
}

const mkdirp = require('mkdirp')
mkdirp.sync(config.app_dir)
