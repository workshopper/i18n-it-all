var exercise = require('../../lib/exercise')
var sample = require('lodash.sample')
var path = require('path')
var languages = ['en', 'ja', 'de']
var contexts = ['browser', 'server']
var fs = require('fs')
var keys = Object.keys(require('pofile')
  .parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', '06_en.po'), 'utf8'))
  .items
  .reduce(function (keys, item) {
    keys[item.msgid] = true
    return keys
  }, {}))

// Lets also ask for a key that doesn't exist
keys = keys.concat([
  'missing-key_' + Date.now().toString(32)
])

function extendingSamples(arr, len) {
  var result = []
  for (var i = 0; i < len; ++i) {
    result.push(sample(arr))
  }
  return result
}

module.exports = exercise(__dirname, {
  execAsync: function (mod, input, callback) {
    mod(input.context, function (err, handler) {
      if (err) {
        if (input.error) {
          callback(null, '\n[' + process.env.LANG + '] (' + input.context + ')\nError passed-on like expected!\n' + err.message)
        }
        return callback(err)
      }
      var output = input.keys.map(function (key) {
        return key + ': ' + handler(key)
      })
      callback(null, '\n[' + process.env.LANG + '] (' + input.context + ')\n' + output.join('\n'))
    })
  },
  createSampleSets: function createSampleSets() {
    var sets = []
    languages.forEach(function (language) {
      contexts.forEach(function (context) {
        sets.push({
          lang: language,
          data: {
            context: context,
            keys: keys
          }
        })
      })
    })
    sets.push({
      lang: 'fr',
      data: {
        context: contexts[0],
        error: true
      }
    })
    return sets
  },
  handleResult: function (input, output) {
    return output
  }
})
