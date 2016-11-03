var translations = require('../../data/addressation.json')
var util = require('util')

module.exports = function addressPersons (persons) {
  var lang = process.env.LANG
  var translation = translations[lang]
  var closestMatch = translation[0]
  for (var i = 1; i <= persons.length; i++) {
    var currentMatch = translation[i.toString()]
    if (currentMatch) {
      closestMatch = currentMatch
    }
  }
  if (/%s/.test(closestMatch)) {
    return util.format.apply(util, [closestMatch].concat(persons))
  }
  return closestMatch
}
