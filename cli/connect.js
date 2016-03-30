const fetch = require('node-fetch')
const fs = require('fs')

module.exports = (args, config) => {
  const host = args[3]
  if (!host) {
    console.log('You need to provide "host" to be able to connect to node')
    console.log('Example: "stay connect 192.168.2.1"')
    process.exit(1)
  }
  const hostname = host.split(':')[0]
  const port = host.split(':')[1]
  if (!hostname || !port) {
    console.log('You need to format the "host" as hostname:port')
    console.log('You gave me "' + hostname + ':' + port + '"')
    process.exit(1)
  }

  const url = 'http://' + hostname + ':' + port

  fetch(url + '/health')
	.then((res) => {
  if (res.status === 200) {
    console.log('node is responding! Adding')
    var nodes = []
    try {
      nodes = require(config.app_dir + '/nodes.json')
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        fs.writeFileSync(config.app_dir + '/nodes.json', JSON.stringify([], null, 2))
      } else {
        throw new Error(err)
      }
    }
    if (nodes.indexOf(url) !== -1) {
      console.log('Already exists! Nothing to do...')
      process.exit(1)
    }
    nodes.push(url)
    fs.writeFileSync(config.app_dir + '/nodes.json', JSON.stringify(nodes, null, 2))
    console.log('Added!')
  } else {
    console.log('node did not respond to request. Are you sure its reachable at "' + url + '" ?')
  }
	}).catch((err) => { console.log(err) })
}
