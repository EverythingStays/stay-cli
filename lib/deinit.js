const fs = require('fs')
const join = require('path').join

module.exports = (path_to_uninstall) => {
  var pkg = JSON.parse(fs.readFileSync((join(path_to_uninstall, '/package.json'))))
  if (pkg.scripts.preinstall === './get-deps.sh') {
    delete pkg.scripts.preinstall
    fs.unlinkSync(join(path_to_uninstall, '/get-deps.sh'))
  }

  if (pkg.scripts.prepublish === './publish-dep.sh') {
    delete pkg.scripts.prepublish
    fs.unlinkSync(join(path_to_uninstall, '/publish-dep.sh'))
  }

  fs.writeFileSync(join(path_to_uninstall, '/package.json'), JSON.stringify(pkg, null, 2))
}
