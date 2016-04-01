const deinit = require('../lib/deinit')

module.exports = (args) => {
  deinit(process.cwd())
  console.log('Removed scripts, don\'t forget to commit your changes')
  process.exit(0)
}
