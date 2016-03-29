#! /usr/bin/env node

var exec = require('child_process').exec
var fs = require('fs')

const ipfs_exists = () => {
  return new Promise((resolve) => {
    exec('which ipfs', err => resolve(!err))
  })
}

const get_deps = () => {
  var deps = require(process.cwd() + "/package.json").esDependencies
  if (!deps) {
    console.log('No esDependencies found')
    process.exit(1)
  }
  return deps
}

ipfs_exists().then((does_exist) => {
  if (does_exist) {
    const deps = get_deps()
    Object.keys(deps).forEach((key) => {
      const name = key
      const hash = deps[key]
      exec('ipfs get ' + hash + ' --output node_modules/' + name, (err, stdout, stderr) => {
        if (err) {
          console.log('Noo, something went wrong!')
          throw new Error(err)
        }
        console.log(stdout)
        console.log(stderr)
        exec('chmod +x node_modules/' + name + '/get-deps.js', (err) => {
          if (err) {
            console.log('Noo, something went wrong!')
            throw new Error(err)
          }
        })
      })
    })
  }
}).catch((err) => {
  throw new Error(err)
})
