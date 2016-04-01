/* global describe, it, beforeEach */
const assert = require('assert')
const install = require('../lib/init')
const join = require('path').join

const helpers = require('./helpers')

describe('Init Lib', () => {
  const package_path = join(__dirname, '/test_package')
  beforeEach(() => {
    helpers.writeNotInstalledPkgJSON(package_path)
  })
  it('Install scripts', () => {
    helpers.writeNotInstalledPkgJSON(package_path)
    install(package_path)
    const pkg = helpers.readPkgJson(package_path)
    assert.strictEqual(pkg.scripts.prepublish, './publish-dep.sh')
  })
  it('Does not overwrite existing scripts', () => {
    helpers.writeInstalledPkgJSONWithOtherScripts(package_path)
    var error = null
    try {
      install(package_path)
    } catch (err) {
      error = err
    }
    const pkg = helpers.readPkgJson(package_path)
    assert.notEqual(pkg.scripts.prepublish, './publish-dep.sh')
    assert(error)
  })
})
