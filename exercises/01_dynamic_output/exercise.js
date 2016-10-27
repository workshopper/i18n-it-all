var path = require('path')
var execModule = require('exec-module')
var after = require('after')
var names = require('../../data/hello_names.json')
var languages = require('../../data/hello_langs.json')
var sampleSize = require('lodash.samplesize')
var zipWith = require('lodash.zipwith')
var diff = require('diff')
var fs = require('fs')
var leftPad = require('leftPad')

function execEach(__, sets, file, callback) {
  var result = []
  var i = 0
  var next = function () {
    var input = sets[i]
    i ++
    if (!input) {
      return callback(null, result.join('\n'))
    }
    var _lang
    execModule(file, {
      setUp: function (file, opt, callback) {
        _lang = process.env.LANG
        process.env.LANG = input.lang
        callback()
      },
      exec: function (file, opt, mod, callback) {
        callback(null, mod(input.name))
      },
      tearDown: function (file, opt, err, data, callback) {
        process.env.LANG = _lang
        callback()
      }
    }, function (err, output) {
      if (err) {
        return callback(err)
      }
      result.push(__('dynamic_output.greeting', {
        input: input,
        output: output
      }))
      next()
    })
  }
  next()
}

function formatDiffs (diffs) {
  return '```\n' + diffs.map(function (diff) {
    if (diff.removed) {
      return ' [-] ' + diff.value
    } else if (diff.added) {
      return ' [+] ' + diff.value
    }
    return ' [.] ' + diff.value
  }) + '```'
}

var solution = path.join(__dirname, 'solution.js')

function createSampleSets() {
  var amount = (2 + Math.random() * 3) | 0
  var langPicks = sampleSize(languages, amount)
  var namePicks = sampleSize(names, amount)
  return zipWith(langPicks, namePicks, function (lang, name) {
    return {
      lang: lang,
      name: name
    }
  })
}

module.exports = {
  problem: {
    file: path.join(__dirname, 'problem.{lang}.md')
  },
  solution: ['```javascript\n' + fs.readFileSync(solution, 'utf8') + '```\n\n'],
  init: function (i18nall) {
    this.i18n = i18nall.i18n
  },
  verify: function (args, callback) {
    var sets = createSampleSets()
    var handleError = function (err) {
      callback(null, false, [
        require('workshopper-adventure/default/header'),
        require('workshopper-adventure/default/fail'),
        '\n    ' + err.stack.split('\n').join('\n    ') + '\n'
      ])
    }.bind(this)
    var __ = this.i18n.__
    execEach(__, sets, solution, function (err, result) {
      if (err) {
        return handleError(err)
      }
      execEach(__, sets, path.resolve(process.cwd(), args[0]), function (err2, result2) {
        if (err2) {
          return handleError(err2)
        }
        var diffs = diff.diffLines(result, result2)
        if (diffs.length === 1) {
          return callback(null, true, [
            require('workshopper-adventure/default/header'),
            require('workshopper-adventure/default/pass'),
            {
              file: path.join(__dirname, 'review.{lang}.md')
            }
          ])
        }
        callback('{error.not_same}:\n' + formatDiffs(diffs), false, 
          [
            require('workshopper-adventure/default/header'),
            require('workshopper-adventure/default/fail')
          ]
        )
      })
    })
  },
  run: function (args, callback) {
    var sets = createSampleSets()
    var __ = this.i18n.__
    execEach(__, sets, path.resolve(process.cwd(), args[0]), function (err, result) {
      if (err) {
        return callback(err)
      }
      console.log(result)
      callback()
    })
  }
}
