const install = require('../lib/install')

module.exports = (args) => {
  console.log('Installing dependencies')
  install(process.cwd(), () => {
    console.log('Installed dependencies, running npm install...')
  })
}
