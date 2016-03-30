var fetch = require('node-fetch')
var rimraf = require('rimraf')
var Git = require('nodegit')
var IPFSApi = require('ipfs-api')
var ipfs = new IPFSApi('localhost', '5001')
// var os = require('os')

const handleErr = (err) => {
  if (err) {
    throw new Error(err)
  }
}

const concatModule = (name, version) => {
  return '[' + name + '@' + version + ']'
}

module.exports = (args, config) => {
  if (!args[3]) {
    console.log('Expected module name as second argument')
    process.exit(1)
  }
  if (!args[4]) {
    console.log('Expected module version as third argument')
    process.exit(1)
  }

  const name = args[3]
  const version = args[4]
  const nameAndVersion = concatModule(name, version)
  console.log(nameAndVersion + ' -> Fetching info from registry.npmjs.org')

  const url = 'https://registry.npmjs.org/' + name
  fetch(url).then((res) => res.json()).then((json) => {
    const repository_url = json.versions[version].repository.url
    const gitHead = json.versions[version].gitHead
    // const shaSum = json.versions[version]._shasum
    // console.log({repository_url, gitHead, shaSum})
    rimraf.sync('./tmp')
    console.log(nameAndVersion + ' -> Cloning from ' + repository_url + '#' + gitHead)
    Git.Clone(repository_url, './tmp')
      .then((repo) => {
        return repo.getCommit(gitHead)
      })
      .then((commit) => {
        const pkg = require('../tmp/package.json')
        if (!pkg.dependencies || pkg.dependencies.length === 0) {
          console.log(nameAndVersion + ' -> No dependencies')
          ipfs.add('./tmp', {recursive: true}, (err, res) => {
            handleErr(err)
            const hash = res[res.length - 2].Hash
            console.log(nameAndVersion + ' -> Published as ' + hash)
          })
        } else {
          console.log('Oh, seems like this dependencies have other dependencies... We need to dive down deeper to make sense of this')
        }
      })
      .catch((err) => {
        throw new Error(err)
      })
  }).catch((err) => {
    throw new Error(err)
  })
}
