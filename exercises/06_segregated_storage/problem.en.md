To pass this exercise, you need to write a module that offers one API. This
API has to return different translations depending on a given context:

```javascript
module.exports = function (context, callback) {
  var translate = function (key) {
    var lang = process.env.LANG
    return value
  }
  // setImmediate is a placeholder to illustrate that this operation has
  // to do an async operation before executing `callback`
  setImmediate(function () {
    callback(null, translate)
  })
}
```

- `context`: contains the either `browser` or `server`
- `callback`: contains a method that you should call asynchronously
- `key`: contains one translation key
- `process.env.LANG`: contains the language that it should translate into

Depending on the language, you need to access the translation of one the
following files:

    {rootdir}/data/06_de.po
    {rootdir}/data/06_en.po
    {rootdir}/data/06_ja.po

The `translate` function that you need to implement has to do nothing more but
look up the key for the language in the languages's `.po` file.

Only show the translations that fit to the context!

The language may change which each request and is stored in the `process.env.LANG`
property.

---

## About the title

The use of the word "segregation" should be frowned upon. It has been used here
to highlight that the meaning can have context.
"Segregation" in the english language is commonly used to reference the
Segregation of whites and blacks in the United States with the strong
co-notion of Nazis themes.

However, if you look in the _Oxford American Dictionary_ it states:

> [Segregation] the action or state of setting someone or something apart from
> other people or things or being set apart: the segregation of pupils with
> learning difficulties.

Without a high proficiency in a language and a good trivia knowledge it is easy
to miss such details. Therefore it is usually a good idea to let someone
check your translation that is good enough in the language **and** the
associated culture.

## PO-files

The `.po` file format is specialized for translations. Like `xgettext`, it
was made for `gettext`, the standard translation system for C. It supports
pluralizations and there are specialized editors for it. To access
`.po` files in node you can use the `pofile` package of node:

```
npm i pofile
```

If you don't have an internet connection you can also use the `pofile` dependency
bundled with `i18n-it-all` here:

    {rootdir}/node_modules/pofile

You can access the content of the `.po` files easily like:

```javascript
var pofile = require('pofile')
pofile.load('path/to/file.po', function (err, data) {
})
```
