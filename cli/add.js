var fs = require('fs')
module.exports = (args, config) => {
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
