var i18nItAll = require('workshopper-adventure')({
  appDir: __dirname,
  menu: {
    bg: 'cyan'
  },
  languages: ['en', 'ja'],
  header: require('workshopper-adventure/default/header'),
  pass: require('workshopper-adventure/default/pass'),
  fail: require('workshopper-adventure/default/fail'),
  footer: [
    require('workshopper-adventure/default/footer')
  ]
})

i18nItAll.addAll([
  '01_dynamic_output',
  '02_i_my_me_mine',
  '03_rocket_science',
  '04_negotiate_with_everyone'
])

module.exports = i18nItAll
