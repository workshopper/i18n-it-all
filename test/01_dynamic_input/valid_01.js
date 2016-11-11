var translations = require('../../data/hello.json')
var util = require('util')

module.exports = function sayHello (name) {
  var four = process.env.LANG
  var two = four.split('-')[0]
  return util.format(translations[four] || translations[two], name)
}
