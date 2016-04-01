const fs = require('fs')
const join = require('path').join

const notInstalledPkg = {
  name: 'TestPackage',
  version: '0.0.1',
  scripts: {}
}
const otherScriptsPkg = {
  name: 'TestPackage',
  version: '0.0.1',
  scripts: {
    prepublish: 'another-something'
  }
}

const installedPkg = {
  name: 'TestPackage',
  version: '0.0.1',
  scripts: {
    prepublish: './publish-dep.sh'
  }
}

module.exports = {
  notInstalledPkg: notInstalledPkg,
  installedPkg: installedPkg,
  otherScriptsPkg: otherScriptsPkg,
  writeNotInstalledPkgJSON: (package_path) => {
    fs.writeFileSync(join(package_path, 'package.json'), JSON.stringify(notInstalledPkg, null, 2))
  },
  writeInstalledPkgJSON: (package_path) => {
    fs.writeFileSync(join(package_path, 'package.json'), JSON.stringify(installedPkg, null, 2))
  },
  writeInstalledPkgJSONWithOtherScripts: (package_path) => {
    fs.writeFileSync(join(package_path, 'package.json'), JSON.stringify(otherScriptsPkg, null, 2))
  },
  readPkgJson: (package_path) => {
    return JSON.parse(fs.readFileSync(join(package_path, '/package.json')))
  }
}
