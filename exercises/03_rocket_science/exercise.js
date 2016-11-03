var sampleSize = require('lodash.samplesize')
var zipWith = require('lodash.zipwith')
var exercise = require('../../lib/exercise')
var languages = ['en-us', 'en-uk', 'de-de', 'ja-jp']

function round4 (value) {
  return ((value * 1000) | 0) / 1000
}

module.exports = exercise(__dirname, {
  exec: function (mod, input) {
    return mod[input.type](input.value)
  },
  createSampleSets: function createSampleSets() {
    return languages.reduce(function (samples, lang) {
      var num = Math.random()
      for (var i = 0; i < 6; i++) {
        samples.push({
          lang: lang,
          data: {
            type: Math.random() ? 'formatWeight' : 'formatDistance',
            value: round4(num)
          }
        })
        num *= Math.random() * 20
      }
      return samples
    }, [])
  },
  handleResult: function (input, output, __) {
    return '[' + input.lang + '] ' + input.data.type + '(' + input.data.value + ') → ' + output
  }
})
