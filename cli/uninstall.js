const uninstall = require('../lib/uninstall')

module.exports = (args) => {
  uninstall(process.cwd())
  console.log('Removed scripts, don\'t forget to commit your changes')
  process.exit(0)
}
