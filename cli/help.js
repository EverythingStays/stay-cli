const printCmdHelp = (name, desc) => {
  console.log()
  console.log('    stay ' + name)
  console.log('        ' + desc)
}

module.exports = (args, config) => {
  const pkg = require('../package.json')
  const version = pkg.version
  const description = pkg.description
  console.log('stay - ' + description + ' - [' + version + ']')
  console.log('Usage: stay [command] [arguments]')
  printCmdHelp('init', 'Adds script hook for publishing a module with `npm publish`')
  printCmdHelp('deinit', 'Removes the script hook')
  printCmdHelp('install', 'Installs dependencies from IPFS')
  printCmdHelp('add module@version', 'Adds a dependency to `package.json`')
  console.log('        `module` is the module name')
  console.log('        `version` is the modules hash outputted from `npm publish`')
  printCmdHelp('connect multiaddr', 'Adds a node to pin to after publishing')
  console.log('        `multiaddr` is the address outputted from running `ipfs id`')
  console.log('        Example: /ip4/10.13.0.5/tcp/4001/ipfs/QmPimdxPFy5K1VdCVfe8JsUd6DpdmKQDTdYCmCfReMQ7YY')
  console.log('')
  console.log('Source: https://github.com/everythingstays/stay-cli')
  console.log('Report a bug: https://github.com/everythingstays/stay-cli/issues/new')
  console.log('')
}
