__('$key: Regular key with a property', 'a')

someObj.__('$key: usage as an object property')

someObj.

__('$key: usage as an object property over several lines')

function hi() {
  __('$key: inside a unexported, unused method scope', 'b')
  var a = '$key: '
  __(a + 'advanced usage where the key is split')
}

module.exports = () => {
  __('$key: regular within an exported method')
  __;
  ('$key: looks like a key is just a string')
}
