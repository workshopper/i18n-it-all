var path = require('path')
var execModule = require('exec-module')
var diff = require('diff')
var fs = require('fs')
var leftPad = require('leftPad')

function formatDiffs (diffs) {
  return '```\n' + diffs.map(function (diff) {
    if (diff.removed) {
      return ' {error.expected} ' + diff.value.split('\n').join('\n            ' )
    } else if (diff.added) {
      return ' {error.actual} ' + diff.value.split('\n').join('\n            ' )
    }
    return ' {error.correct} ' + diff.value
  }).join('\n') + '```'
}

function execEach(__, sets, file, exec, handleResult, callback) {
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
        if (exec) {
          return callback(null, exec(mod, input.data))
        }
        callback(null, mod(input.data))
      },
      tearDown: function (file, opt, err, data, callback) {
        process.env.LANG = _lang
        callback()
      }
    }, function (err, output) {
      if (err) {
        return callback(err)
      }
      result.push(handleResult(input, output, __))
      next()
    })
  }
  next()
}

module.exports = function (folder, opts) {
  var solution = path.join(folder, 'solution.js')
  return {
    problem: {
      file: path.join(folder, 'problem.{lang}.md')
    },
    init: function (i18nall) {
      this.i18n = i18nall.i18n
    },
    solution: ['```javascript\n' + fs.readFileSync(solution, 'utf8').replace('../../data', '{rootdir}/data') + '```\n\n'],
    verify: function (args, callback) {
      var sets = opts.createSampleSets()
      var handleError = function (err) {
        callback(null, false, [
          require('workshopper-adventure/default/header'),
          require('workshopper-adventure/default/fail'),
          '\n    ' + err.stack.split('\n').join('\n    ') + '\n'
        ])
      }.bind(this)
      var __ = this.i18n.__
      execEach(__, sets, solution, opts.exec, opts.handleResult, function (err, result) {
        if (err) {
          return handleError(err)
        }
        execEach(__, sets, path.resolve(process.cwd(), args[0]), opts.exec, opts.handleResult, function (err2, result2) {
          if (err2) {
            return handleError(err2)
          }
          var diffs = diff.diffLines(result, result2)
          if (diffs.length === 1) {
            return callback(null, true, [
              require('workshopper-adventure/default/header'),
              require('workshopper-adventure/default/pass'),
              {
                file: path.join(folder, 'review.{lang}.md')
              },
              '---'
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
      var sets = opts.createSampleSets()
      var __ = this.i18n.__
      execEach(__, sets, path.resolve(process.cwd(), args[0]), opts.exec, opts.handleResult, function (err, result) {
        if (err) {
          return callback(err)
        }
        console.log(result)
        callback()
      })
    }
  }
}
