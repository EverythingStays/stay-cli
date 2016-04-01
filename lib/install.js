var fs = require('fs')
var join = require('path').join
var execSync = require('child_process').execSync

const downloadPackage = (path, name, hash) => {
  // TODO Ok, this is bad, I know. But apparently recursive, async code is difficult.
  // If you see this and want to improve it, please!
  // First step, get rid of all the synchronous code, it blocks I/O
  // console.log(name + ' ' + hash)
  execSync('ipfs get ' + hash + ' --output ' + join(path, 'node_modules', name), {stdio: []})
}

const notInstalledDependencies = (path) => {
  var not_installed_yet = {}
  const dirs = fs.readdirSync(path).filter((file) => {
    return fs.statSync(join(path, file)).isDirectory() && file.split('')[0] !== '.'
  })
  dirs.forEach((directory) => {
    const deps = readDeps(join(path, directory))
    if (deps) {
      Object.keys(deps).forEach((key) => {
        const name = key
        const hash = deps[key]
        if (dirs.indexOf(name) === -1) {
          not_installed_yet[name] = hash
        }
      })
    }
  })
  const deps_installed = dirs.length
  const deps_left = Object.keys(not_installed_yet).length
  process.stdout.write(deps_left + ' left to install, have ' + deps_installed + ' installed so far\r')
  return not_installed_yet
}

const downloadAllDependencies = (path, deps) => {
  Object.keys(deps).forEach((key) => {
    const name = key
    const hash = deps[key]
    downloadPackage(path, name, hash)
  })
  const new_deps = notInstalledDependencies(join(path, 'node_modules'))
  if (Object.keys(new_deps).length === 0) {
    return
  }
  return downloadAllDependencies(path, new_deps)
}

const readDeps = (path) => {
  const pkg = JSON.parse(fs.readFileSync(join(path, 'package.json')))
  return pkg.esDependencies
}

module.exports = (path, callback) => {
  console.log('Getting dependencies from IPFS')
  const pkg = JSON.parse(fs.readFileSync(join(path, 'package.json')))
  if (!pkg.esDependencies) {
    throw new Error('No esDependencies found in package.json')
  }
  downloadAllDependencies(path, readDeps(path))
  callback()
}
