var i18nItAll = require('workshopper-adventure')({
  appDir: __dirname,
  menu: {
  	bg: 'cyan'
  },
  header: require('workshopper-adventure/default/header'),
  footer: require('workshopper-adventure/default/footer')
})

i18nItAll.addAll([
	'01_dynamic_output'
])

module.exports = i18nItAll
