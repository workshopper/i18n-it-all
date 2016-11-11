var translations = require('../../data/hello.json')['en']
var util = require('util')

module.exports = function sayHello (name) {
  return util.format(translations, name)
}
