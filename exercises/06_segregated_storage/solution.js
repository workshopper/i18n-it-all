var pofile = require('../../node_modules/pofile')
var path = require('path')

module.exports = function (context, callback) {
  var translate = function (key) {
    var lang = process.env.LANG
    return value
  }
  var file = path.join(__dirname, '../../data', '06_' + process.env.LANG + '.po')
  pofile.load(file, function (err, data) {
    if (!err && !data) {
      err = new Error('No data found')
    }
    if (err) {
      return callback(err)
    }
    var keys = data.items.filter(function (item) {
      return item.msgctxt === context
    }).reduce(function (keys, item) {
      keys[item.msgid] = item.msgstr
      return keys
    }, {})
    callback(null, function (key) {
      return keys[key]
    })
  })
}
