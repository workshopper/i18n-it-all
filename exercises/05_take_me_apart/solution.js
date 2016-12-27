var glob = require('../../node_modules/glob')
var fs = require('fs')
var path = require('path')
var xgettextJS = new (require('../../node_modules/xgettext-js'))({
  keywords: {'__': 1}
})

module.exports = function (folder) {
  var files = glob.sync('**/*.js', {cwd: folder})
  return Object.keys(files.reduce(function (allKeys, file) {
    file = path.join(folder, file)
    return xgettextJS
      .getMatches(fs.readFileSync(file, 'utf8'))
      .reduce(function (allKeys, key) {
        allKeys[key.string] = true
        return allKeys
      }, allKeys)
  }, {}))
}
