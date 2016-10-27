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

---

## Notes

You do not need to know the greeting in all languages. This file contains al 
you need:

    {rootdir}/data/hello.json

This file contains a greeting for all the languages it will be tested against. One String will have a placeholder specified as `[name]` which can be used to
personalize the greeting.

ISO standardised language codes under the [ISO 639] system. In this exercise 
we use two-letter [ISO 639-1] language codes. These language codes technically
does not contain every possible language that exists but in practise, all the 
common languages are specified. In the ISO 639 specification `de` stands for german, `en` for english, etc.

Lets be more specific! The language codes can come with [ISO 3166-1] 
two-letter country code attached. `de-at` stands for 
_"german language used in austria"_ or `zh-tw` for _"chinese language used in 
taiwan"_.

This file contains all the languages that will be tested from the system. 
However, since we havn't found all the chinese or japanese dialects you
will have to fall back to the two-letter language code in case the combination
is not available.

Beside those common occuring combinations, in your project it might also 
make sense to have uncommon combinations. `en-jp` could stand for "english 
language used japan" which does have a few special expression!

[ISO 639]: https://en.wikipedia.org/wiki/ISO_639 
[ISO 639-1]: https://en.wikipedia.org/wiki/ISO_639-1
[ISO 3166-1]: https://en.wikipedia.org/wiki/ISO_3166-1
