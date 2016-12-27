var Qty = require('../../node_modules/js-quantities')
var fmt = new Intl.NumberFormat('en-en', { maximumFractionDigits: 2 })

function formatGerman (unit, amount) {
  var value = amount.to(unit).scalar
  var str = fmt.format(value)
  return str.replace(/,|\./ig, function (found) {
    return found === '.' ? ',' : '.'
  }) + unit
}

function format (unit, amount) {
  var value = amount.to(unit).scalar
  return fmt.format(value) + unit
}

var strategies = {
  'de-de': {
    weight: formatGerman.bind(null, 'kg'),
    distance: formatGerman.bind(null, 'm')
  },
  'en-uk': {
    weight: function (amount) {
      return format('lb', amount) + ' (' + format('kg', amount) + ')'
    },
    distance: format.bind(null, 'ft')
  },
  'en-us': {
    weight: format.bind(null, 'lb'),
    distance: format.bind(null, 'ft')
  },
  'ja-jp': {
    weight: format.bind(null, 'kg'),
    distance: format.bind(null, 'm')
  }
}

exports.formatWeight = function (amountInKg) {
  var amount = new Qty(amountInKg, 'kg')
  return strategies[process.env.LANG].weight(amount)
}

exports.formatDistance = function (amountInMeter) {
  var amount = new Qty(amountInMeter, 'm')
  return strategies[process.env.LANG].distance(amount)
}
