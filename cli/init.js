const install = require('../lib/install')

module.exports = (args) => {
  install(process.cwd())
  console.log('Installed scripts, don\'t forget to commit your changes')
  process.exit(0)
}
