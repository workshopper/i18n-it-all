var translations = require('../../data/hello.json')

module.exports = function (name) {
	var lang = process.env.LANG
	var base = translations[lang]
	if (!base) {
		base = translations[lang.split('-')[0]]
	}
	return base.replace('{name}', name)
}
