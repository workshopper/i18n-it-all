var names = require('../../data/names.json')
var languages = require('../../data/hello_langs.json')
var sampleSize = require('lodash.samplesize')
var zipWith = require('lodash.zipwith')
var exercise = require('../../lib/exercise')

module.exports = exercise(__dirname, {
  createSampleSets: function createSampleSets() {
    var amount = (2 + Math.random() * 3) | 0
    var langPicks = sampleSize(languages, amount).concat(['en', 'en-us'])
    var namePicks = sampleSize(names, langPicks.length)
    return zipWith(langPicks, namePicks, function (lang, name) {
      return {
        lang: lang,
        data: name
      }
    })
  },
  handleResult: function (input, output, __) {
    return __('dynamic_output.greeting', {
      input: input,
      output: output
    })
  }
})
