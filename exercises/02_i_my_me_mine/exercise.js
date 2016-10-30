var names = require('../../data/names.json')
var sampleSize = require('lodash.samplesize')
var zipWith = require('lodash.zipwith')
var exercise = require('../../lib/exercise')
var addressation = require('../../data/addressation.json')
var languages = Object.keys(addressation)

module.exports = exercise(__dirname, {
  createSampleSets: function createSampleSets() {
    var amount = (2 + Math.random() * 3) | 0
    return sampleSize(languages, amount).map(function (lang) {
      return {
        lang: lang,
        data: sampleSize(names, Math.random() * 5 | 0)
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
