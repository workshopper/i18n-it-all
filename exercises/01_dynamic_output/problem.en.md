To pass this exercise write a module that takes a two or four-letter
_(hyphenated)_ language specifier from the `process.env.LANG`  environment
variable to respond with a greeting to a person with his name in the
appropriate language.

```javascript
module.exports = function greet (name) {
    return // your code
}
```

For example: If your module is called like `greet("Michael")` and the
environment variable contains `process.env.LANG === 'ja-jp'` then it should
return `こんにちは、Michaelさん！`.

The following file contains greetings in all the languages you need:

    {rootdir}/data/hello.json

Translations in the file will have a placeholder specified as `%s` which can
be used to personalize the greeting.

---

## Hints

To load a `.json` file you can simply require it:

```javascript
var data = require(filePath)
```

---

You are free replace the String in any way you want, but Node.js's `util.format`
method might come in handy.

---

ISO standardized language codes under the [ISO 639] system. In this exercise
we use two-letter [ISO 639-1] language codes. At the moment only 184 languages are
specified this means that very minor languages are not covered by this standard.
In practice that is almost never a problem. In the ISO 639 specification
`de` stands for german, `en` for english, etc.

Lets be more specific! The language codes can come with [ISO 3166-1]
two-letter country code attached. `de-at` stands for
_"german language used in austria"_ or `zh-tw` for _"chinese language used
in taiwan"_.

_Side Note:_ Beside those common occurring combinations, in your project it
might also make sense to have uncommon combinations. `en-jp` could stand
for "english language used japan" which does have a few special
expression!

---

The provided file contains all the languages that will be tested from the
system. However, since we have not found all the chinese or japanese
dialects you will have to fall back to the two-letter language code in
case the combination is not available.

[ISO 639]: https://en.wikipedia.org/wiki/ISO_639
[ISO 639-1]: https://en.wikipedia.org/wiki/ISO_639-1
[ISO 3166-1]: https://en.wikipedia.org/wiki/ISO_3166-1
