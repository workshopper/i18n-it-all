var sampleSize = require('lodash.samplesize')
var sample = require('lodash.sample')
var zipWith = require('lodash.zipwith')
var exercise = require('../../lib/exercise')
var locales = [
  'en', 'en-us', 'en-uk', 'de-de', 'ja-jp',
  'en-it', 'ja-uk', 'de-at', 'de', 'fr-fr',
  'ja', 'pt-br', 'pt-pt', 'zh-cn', 'zh-tw',
  'sv', 'ru-ru', 'zh', 'tr', 'nb-no', 'id'
]

function createSampleLanguageSet () {
  var langs = sampleSize(locales, (Math.random() * 5) + 0.5)
  if (langs.length == 0) {
    return {}
  }
  return {
    'accept-language': langs.map(function (lang, index) {
    if (index === 0) {
        return lang
      }
      if (index === 1 || index === 2) {
        return lang + ';q=0.8'
      }
      return lang + ';q=0.4'
    }).join(', ') + (Math.random() > 0.6 ? ', *:q=0.2' : '')
  }
}

module.exports = exercise(__dirname, {
  exec: function (mod, input) {
    var cookies = {
      locale: input.locale
    }
    mod(input.locales, cookies, input.requestHeaders)
    return cookies.locale
  },
  createSampleSets: function createSampleSets() {
    var samples = []
    var max = 4 + Math.random() * 8
    for (var i = 0; i < max; i++) {
      samples.push({
        lang: 'en',
        data: {
          locales: sampleSize(locales, (1 + Math.random() * 2) + 0.5 | 0),
          locale: Math.random() > 0.8 ? undefined : sample(locales),
          requestHeaders: createSampleLanguageSet()
        }
      })
    }
    return samples
  },
  handleResult: function (input, output, __) {
    return input.data.locales + ', ' + input.data.locale + ', ' + input.data.requestHeaders['accept-language'] + ' → ' + output
  }
})
