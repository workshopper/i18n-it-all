Write a script that gets all the translation strings within a folder.
You will receive a folder like:

```javascript
module.exports = function (folderName) {
  var translationKeys = []
  // Fill translationKeys with all the translations in this folder
  return translationKeys
}
```

The folder will contain multiple `.js` files in the folder and subfolders.
You will need to look out for translation strings like `__` or `.__`.

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

### Finding in Files

Instead of using Node.js's `fs.readdir` it is easier to use the npm module `glob`.
Version `^7.1.1` is bundled with this workshopper:

```javascript
require('{rootdir}/node_modules/glob')
```

The readme is available here:

    {rootdir}/node_modules/glob/README.md
