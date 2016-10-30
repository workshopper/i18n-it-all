To pass this exercise you need to write a module with three
methods.

The first method should render a text to address people:

```javascript
module.exports = function addressRecepients(persons) {
  var properAddressing
  // ... figure out how to properly address 
  return properAddressing
}
```

The input argument `persons` is an Array with the name of one or more names.

To determine the language a two letter language code like `en` will be provided in the `process.env.LANG` environment variable.

---

## Hints:

You do not need to know the addres different people in all languages. The 
following file contains all you need:

    {rootdir}/data/addressation.json

For every language there is going to be an Object in the `.json` file that that
looks like this:

```javascript
{
  "0": "Hello unknown!",
  "1": "Hello %s!",
  "2": "Hello %s, Hello %!",
  "3": "Hello %s, %s and %s!",
  "4": "Hello everyone!"
}
```

If the array passed in has no entries it should use `"0"`, if it has one entry 
it should use `"1"`, etc. If there are more than 4 entries in array it should 
still use `"4"`.

