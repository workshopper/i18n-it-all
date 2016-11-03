var i18nItAll = require('workshopper-adventure')({
  appDir: __dirname,
  menu: {
  	bg: 'cyan'
  },
  header: require('workshopper-adventure/default/header'),
  footer: [
  	'---',
  	require('workshopper-adventure/default/footer')
  ]
})

i18nItAll.addAll([
	'01_dynamic_output',
  '02_i_my_me_mine',
  '03_rocket_science'
])

module.exports = i18nItAll
