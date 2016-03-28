#! /usr/bin/env node

const fs = require('fs')
const args = process.argv
const cmd = args[2]

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
