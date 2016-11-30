var exercise = require('../../lib/exercise')
var path = require('path')

module.exports = exercise(__dirname, {
  createSampleSets: function createSampleSets() {
    var samples = []
    samples.push({
      data: path.join(__dirname, 'templates')
    })
    return samples
  },
  handleResult: function (input, output, __) {
    return output.join('\n')
  }
})
