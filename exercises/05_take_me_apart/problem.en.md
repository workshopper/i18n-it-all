Write a script that gets all the translation strings within javascript files
in a folder.

You will receive a folder like:

```javascript
module.exports = function (folderPath) {
  var translationKeys = []
  // Fill translationKeys with all the translations in this folder
  return translationKeys
}
```

where `folderPath` points to a directory that contains various files and folders.

The resulting `translationKeys` has to contain a list of all the translation keys
used of `.js` files in this folder and subfolders. You will need to look out for
translation strings like `__` or `.__`.

---

## Hints

### Processing the code

You can write your own code to process the code or you can use one of the many
modules in NPM. The package `xgettext-js` should come in handy.
The version `1.1.0` is bundled with this workshopper:

```javascript
require('{rootdir}/node_modules/xgettext-js')
```

The readme is available here:

    {rootdir}/node_modules/xgettext-js/README.md

With `xgettext-js` you can parse a javascript file's content and look for keys

```javascript
var XGetTextJS = require('{rootdir}/node_modules/xgettext-js')
var xGetTextJS = new XGetTextJS({
  // Options
})

xGetTextJS.getMatches(fileContentAsString)
```

_Note:_ `gettext` has the default method `_`. You will need to specify the
options properly for our use case.

### Finding in Files

Instead of using Node.js's `fs.readdir` it is easier to use the npm module `glob`.
Version `^7.1.1` is bundled with this workshopper:

```javascript
require('{rootdir}/node_modules/glob')
```

The readme is available here:

    {rootdir}/node_modules/glob/README.md

With `glob` you can look easily for a lot of files in a folder:

```javascript
var glob = require('{rootdir}/node_modules/glob')
var mdFilesInFolder = glob.sync('**/*.md', {
  // Options
})
```

_Note:_ `glob` runs by default in the current working directory, so you will
need to adjust the "base" which `glob` uses as a working directory by setting some
option.
