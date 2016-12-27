var exercise = require('../../lib/exercise')
var path = require('path')
var mkdirp = require('mkdirp')
var fs = require('fs')

function join (arr) {
  return path.join.apply(path, arr)
}
var files = [
  ['a.js'],
  ['b.js'],
  ['c.md']
].map(function (name) {
  var location = join([__dirname, 'templates'].concat(name))
  return {
    location: location,
    data: fs.readFileSync(location, 'utf8'),
    ext: path.extname(location)
  }
})

var tmp = require('tmp')
function niceRandom () {
  return Math.round(Math.random() * 100000).toString(32)
}

function getTargetFiles (folders, target) {
  return files.map(function (file, k) {
    var to = folders.concat('f' + niceRandom() + file.ext)
    return {
      from: file.location,
      data: file.data,
      key: join(to),
      to: join([target.name].concat(to)),
    }
  })
}

function createFolder () {
  var target = tmp.dirSync({ prefix: 'i18n-it-all_take_me_apart_' })
  var allFiles = getTargetFiles([], target)
  for (var i = 0; i < 3; i++) {
    var depth = Math.round(Math.random() * 3) + 1
    var folders = []
    for (var j = 0; j < depth; j++) {
      folders.push('dir_' + i + '_' + niceRandom())
    }
    allFiles = allFiles.concat(getTargetFiles(folders, target))
  }
  allFiles.forEach(function (file) {
    mkdirp.sync(path.dirname(file.to))
    fs.writeFileSync(file.to, file.data.replace(/\$key/g, niceRandom()))
  })
  return target.name
}

module.exports = exercise(__dirname, {
  createSampleSets: function createSampleSets() {
    return [{
      data: createFolder()
    }]
  },
  handleResult: function (input, output, __) {
    if (!Array.isArray(output)) {
      throw new Error(__('error.result_no_array'))
    }
    var list = output.sort()
    return input.data + '\n' + list.join('\n')
  }
})
