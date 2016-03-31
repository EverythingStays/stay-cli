/* global describe, it */
const assert = require('assert')
const uninstall = require('../lib/deinit')
const join = require('path').join

const helpers = require('./helpers')

describe('Deinit Lib', () => {
  const package_path = join(__dirname, '/test_package')
  it('Uninstall scripts', () => {
    helpers.writeInstalledPkgJSON(package_path)
    uninstall(package_path)
    const pkg = helpers.readPkgJson(package_path)
    assert.deepStrictEqual(pkg, helpers.notInstalledPkg)
  })
  it('Does not uninstall if scripts are not from stay', () => {
    helpers.writeInstalledPkgJSONWithOtherScripts(package_path)
    uninstall(package_path)
    const pkg = helpers.readPkgJson(package_path)
    assert.deepStrictEqual(pkg, helpers.otherScriptsPkg)
  })
})
