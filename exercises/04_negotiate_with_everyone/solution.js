var Locales = require('../../node_modules/locale').Locales

module.exports = function getLocale (locales, cookies, requestHeaders) {
  var supported = new Locales(locales)
  var locale
  if (supported.index()[cookies.locale]) {
    // {negotiate_with_everyone.cookies}
    locale = cookies.locale
  } else if (requestHeaders['accept-language']) {
    // {negotiate_with_everyone.headers}
    var languages = new Locales(requestHeaders['accept-language'])
    locale = languages.best(supported).code
  } else {
    // {negotiate_with_everyone.fallback}
    locale = supported.best().code
  }
  // {negotiate_with_everyone.cookies2}
  cookies.locale = locale
}
