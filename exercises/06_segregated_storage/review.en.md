## Why to separate the content

One of the most common problems when working in the web is that some content
needs to come from the server while others should be readily available in the
client. Particularly when using rich interfaces and frameworks such as React or Angular.

If you diligently separate the storage for the translations of the frontend
and the backend it will keep the file size for each translation small for the
client without the need to "search" for the required translations.

## Async loading of context

It is advisable for translation logic to work in sync _(as opposed to async)_.

_Good:_
`__('translation.key')`

_Not so good:_
`__('translation.key', function (err, translation) {})`

Having to take care of callbacks in every translation would give a lot of work
for little value. However, as you witnessed in this exercise, the opposite is
true for the translation-context. Async loading saves resources and opens up the
possible to get other things done in parallel:

_Good:_

```javascript
context(function (__) {
  __('translation.key')
})
```

_Not so good:_

```javascript
var __ = context();
__('translation.key')
```

## What file-format to choose

`.po`, `.yaml` and `.json` are the most popular, general file formats to store
translations.

In Node you should use `.json` when you do not want the translation be modified
by hand. Modifying translation in a `.json` file, specially when you have to
deal with whole paragraphs of text, is painful. On the other hand Node.js loads
the translation really fast and the file-format can be used on the client as-is.

`.yaml` is working best when your translator knows how to access the source files
and you feel generally comfortable to edit the translations in-place. `.yaml`
files allow for multi-line text and specialized property accessors that can make
your life easier.

`.po` files on the other hand are the existing for the longest and can be
very useful in if you have some C code and you want to share the translation files.

If you work with `Google Spreadsheets` or `Excel` (etc.) to maintain your
translations, even a format like `.csv` might have certain advantages.

## `.pot` files

In this exercise we used `.po` files which are and have been a standard for a
long time. However, usually the workflow starts with `.pot` files. `.pot` files
are `.po` files without translations that can be use as _template_ to create `.po`
files for each language.
