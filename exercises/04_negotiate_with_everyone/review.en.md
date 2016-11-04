## Review

The module you wrote can be easily used for actual language negotiation in an 
`express`-js web server. Together with the package `cookie-parser`:

```javascript
var http = require('http')
var languageDetector = require('./the-module-you-just-wrote.js')
var languages = ['en', 'de', 'ja']

var app = require('express')()
app.use(require('cookie-parser')())
app.use(function (req, res, next) {
  languageDetector(languages, req.cookies, req.headers)
  next()
})
app.use(function (req, res) {
  res.end('Locale is ' + req.cookies.locale)
})

var server = http.createServer(app)
server.listen(8080)
```

This way your webserver already supports locale selection.

For better user experience, now you can adjust your locale identification to 
better target your users. For example you could use [service workers][1] that 
use the same logic but do it locally & quicker than on the server.

[1]: https://developer.mozilla.org/en/docs/Web/API/Service_Worker_API