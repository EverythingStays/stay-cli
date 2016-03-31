const fs = require('fs')
const join = require('path').join

module.exports = (path_to_install) => {
  var pkg = JSON.parse(fs.readFileSync((join(path_to_install, '/package.json'))))
  if (pkg.scripts.preinstall) {
    throw new Error('scripts.preinstall already filled out. Aborting')
  }
  if (pkg.scripts.prepublish) {
    throw new Error('scripts.prepublish already filled out. Aborting')
  }
  fs.writeFileSync(join(path_to_install, '/get-deps.sh'), fs.readFileSync(join(__dirname, '../scripts/get-deps.sh')))
  fs.writeFileSync(join(path_to_install, '/publish-dep.sh'), fs.readFileSync(join(__dirname, '../scripts/publish-dep.sh')))

  fs.chmodSync(path_to_install + '/get-deps.sh', 755)
  fs.chmodSync(path_to_install + '/publish-dep.sh', 755)

  pkg.scripts.preinstall = './get-deps.sh'
  pkg.scripts.prepublish = './publish-dep.sh'
  fs.writeFileSync(path_to_install + '/package.json', JSON.stringify(pkg, null, 2))
}
