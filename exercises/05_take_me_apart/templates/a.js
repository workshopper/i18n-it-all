__('$key: regular')

// Twice to make sure that duplicates are removed
__('$key: regular')

function hi() {
  __('$key: unexported function')
}

module.exports = () => {
  __('$key: exported function')
}
