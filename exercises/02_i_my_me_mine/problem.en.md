To pass this exercise you need to write a module to address persons. It should
take only one argument which is an array containing a list of persons:

```javascript
module.exports = function addressRecepients (persons) {
  var properAddressing
  // ... figure out how to properly address
  return properAddressing
}
```

The input argument `persons` can have no name, one name or several.

To determine the language a two letter language code like `en` will be provided
in the `process.env.LANG` environment variable.

The following file contains all the addressations you will need:

    {rootdir}/data/addressation.json

For every language there is going to be an Object in the `.json` file that that
looks like this:

```javascript
{
  "0": "Hello unknown!",
  "1": "Hello %s!",
  "2": "Hello %s, Hello %s!",
  "3": "Hello %s, %s and %s!",
  "4": "Hello everyone!"
}
```

If the array passed in has no entries it should use `"0"`, if it has one entry
it should use `"1"`, etc. If there are not enough available translations (i.e. 4)
in array it should use maximum (`"4"`).
