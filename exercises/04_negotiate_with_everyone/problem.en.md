To pass this exercise you need to write a module that selects the matching 
locale out of a set of locales and stores it in the cookie property:

```javascript
module.exports = function getLocale (locales, cookies, requestHeaders) {
  var locale = // ... your task: choose a locale
  cookies.locale = locale
}
```

`locales` will be an array containing one more many locales. The locales are 
either two- or hyphenated-four-letter locales. The order of the locales
specifies the importance.
Example: `['en-us', 'en', 'de']` 

`cookies` will be an object that may or may-not contain a `locale` property that contains **one** locale. The locale is also either a two- or 
hyphenated-four-letter locale.

`requestHeaders` will be an object that may or may-not contain an
`accept-language` property which is a string that follows the [HTTP 
specification][1] for `accept-language`.
Example: `fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5`

The logic should prioritize `cookies` before `requestHeaders` before falling back on the favorite locale.

[1]:https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language

---

## Hints

Content negotiation is often abstracted into frameworks.
`i18next-express-middleware` is a common module. However: for this exercise it 
might be useful to look at the npm package `locale` which offers most of the 
necessary functionality.

In case you don't have an internet connection, version `0.1.0` of `locale` is 
bundled with this workshopper:

```javascript
require('{rootdir}/node_modules/locale')
```

You can find the readme here:

    {rootdir}/node_modules/locale/README.md

## Background

There are persons out there that speak more than one language. For those 
persons, operating systems allow to specify a list of languages that are 
preferred.

Locale negotiation is necessary in order to determine which locale is the most
suited to the user. There are straightforward cases like:

| User  | Product |
|-------|---------|
| en-uk | en-uk   |
|       | de-de   |

Where the user should obviously be presented with the matching `en-uk` 
website. Another pretty common case is:

| User  | Product |
|-------|---------|
| en-us | en-uk   |
|       | de-de   |

Where the user's preferences clearly fit one locale, even though not 100%. But what to do when it looks something like this:

| User  | Product |
|-------|---------|
| nl-nl | en-uk   |
|       | de-de   |

Now neither is going to make the user happy but we have to show something. In 
this case it is reasonable to fallback to **our** preferred language: `en-uk`.
_(Maybe german might be better for dutch customers?)_

But there is the even slightly more complicated case:

| User  | Product |
|-------|---------|
| en-uk | de-de   |
| de-de | en-us   |

Where we have an exact match in `de-de` but not a not-exact, yet-preferred,
match with `en-uk`. Here is where content-negotiation is tricky but important
to know. If you use a standard-tool like `locale` it will use its own 
heuristics that might not suite your user-target group.
