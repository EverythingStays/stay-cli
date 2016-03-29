#! /usr/bin/env node

const fs = require('fs')
const args = process.argv
const cmd = args[2]
const fetch = require('node-fetch')
const mkdirp = require('mkdirp')

const APP_DIR = process.env.HOME + '/.stay'

mkdirp.sync(APP_DIR)

if (cmd === 'install') {
  var pkg = require(process.cwd() + '/package.json')
  if (pkg.scripts.preinstall) {
    console.log('scripts.preinstall already filled out. Aborting')
    process.exit(1)
  }
  if (pkg.scripts.prepublish) {
    console.log('scripts.prepublish already filled out. Aborting')
    process.exit(1)
  }
  fs.writeFileSync(process.cwd() + '/get-deps.sh', fs.readFileSync(__dirname + '/scripts/get-deps.sh'))
  fs.writeFileSync(process.cwd() + '/publish-dep.sh', fs.readFileSync(__dirname + '/scripts/publish-dep.sh'))
  fs.chmodSync(process.cwd() + '/get-deps.sh', 0755)
  fs.chmodSync(process.cwd() + '/publish-dep.sh', 0755)
  pkg.scripts.preinstall = './get-deps.sh'
  pkg.scripts.prepublish = './publish-dep.sh'
  fs.writeFileSync(process.cwd() + '/package.json', JSON.stringify(pkg, null, 2))
  console.log('Installed scripts, don\'t forget to commit your changes')
  process.exit(0)
}

if (cmd === 'uninstall') {
  var pkg = require(process.cwd() + '/package.json')

  if (pkg.scripts.preinstall === './get-deps.sh') {
    delete pkg.scripts.preinstall
    fs.unlinkSync(process.cwd() + '/get-deps.sh')
  } else {
    console.log('get-deps script was not installed ')
  }

  if (pkg.scripts.prepublish === './publish-dep.sh') {
    delete pkg.scripts.prepublish
    fs.unlinkSync(process.cwd() + '/publish-dep.sh')
  } else {
    console.log('publish-dep script was not installed ')
  }

  fs.writeFileSync(process.cwd() + '/package.json', JSON.stringify(pkg, null, 2))
  console.log('Removed scripts, don\'t forget to commit your changes')
}

if (cmd === 'add') {
  var module = args[3]
  const name = module.split('@')[0]
  const version = module.split('@')[1]
  if (!version) {
    console.log('You need to provide "module@hash" to install it')
    console.log('Example: "es add lodash@hash"')
    process.exit(1)
  }

  var pkg = require(process.cwd() + '/package.json')
  if (pkg.esDependencies) {
    if (pkg.esDependencies[name]) {
      console.log('Updating ' + name + ' to ' + version)
    } else {
      console.log('Adding ' + name + '@' + version)
    }
    pkg.esDependencies[name] = version
  } else {
    pkg.esDependencies = {
      [name]: version
    }
  }
  fs.writeFileSync(process.cwd() + '/package.json', JSON.stringify(pkg, null, 2))
}

if (cmd === 'connect') {
  const host = args[3]
  if (!host) {
    console.log('You need to provide "host" to be able to connect to node')
    console.log('Example: "stay connect 192.168.2.1"')
    process.exit(1)
  }
  const hostname = host.split(':')[0]
  const port = host.split(':')[1]
  if (!hostname || !port) {
    console.log('You need to format the "host" as hostname:port')
    console.log('You gave me "' + hostname + ':' + port + '"')
    process.exit(1)
  }

  const url = 'http://' + hostname + ':' + port

  fetch(url + '/health')
	.then((res) => {
    if (res.status === 200) {
      console.log('node is responding! Adding')
      var nodes = []
      try {
        nodes = require(APP_DIR + '/nodes.json')
      } catch(err) {
        if (err.code === 'MODULE_NOT_FOUND') {
          fs.writeFileSync(APP_DIR + '/nodes.json', JSON.stringify([], null, 2))
        } else {
          throw new Error(err)
        }
      }
      if (nodes.indexOf(url) !== -1) {
        console.log('Already exists! Nothing to do...')
        process.exit(1)
      }
      nodes.push(url)
      fs.writeFileSync(APP_DIR + '/nodes.json', JSON.stringify(nodes, null, 2))
      console.log('Added!')
    } else {
      console.log('node did not respond to request. Are you sure its reachable at "' + url + '" ?')
    }
	}).catch((err) => {console.log(err)})
}
