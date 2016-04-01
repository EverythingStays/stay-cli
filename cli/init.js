const init = require('../lib/init')

module.exports = (args) => {
  init(process.cwd())
  console.log('Installed scripts, don\'t forget to commit your changes')
  process.exit(0)
}
