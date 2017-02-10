var path = require('path')
var execModule = require('exec-module')
var diff = require('diff')
var fs = require('fs')
var leftPad = require('leftPad')

function formatDiffs (diffs) {
  return '```\n' + diffs.map(function (diff) {
    var msg
    if (diff.removed) {
      msg = 'diff.expected'
    } else if (diff.added) {
      msg = 'diff.actual'
    } else {
      msg = 'diff.correct'
    }
    return ' {' + msg + '} ' + diff.value.split('\n').join('\n {' + msg + '} ' )
  }).join('\n') + '```'
}

function execEach(__, sets, file, execAsync, handleResult, callback) {
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
        if (execAsync) {
          return execAsync(mod, input.data, callback)
        }
        if (typeof mod !== 'function') {
          throw new Error('Module doesn\'t export a function.')
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
      try {
        result.push(handleResult(input, output, __))
      } catch (err) {
        return callback(err)
      }
      next()
    })
  }
  next()
}

function getExecAsync(opts) {
  if (opts.execAsync) {
    return opts.execAsync
  }
  if (opts.exec) {
    return function (mod, input, callback) {
      callback(opts.exec(mod, input))
    }
  }
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
    solution: ['```javascript\n' + fs.readFileSync(solution, 'utf8').replace(/\.\.\/\.\.\/(data|node_modules)/g, function (full, find) {
      return '{rootdir}/' + find
    }) + '```\n\n'],
    verify: function (args, callback) {
      var sets = opts.createSampleSets()
      var handleError = function (err) {
        callback(null, false, '\n    ' + String(err).split('\n').join('\n    ') + '\n')
      }.bind(this)
      var __ = this.i18n.__
      var execAsync = getExecAsync(opts)
      execEach(__, sets, solution, execAsync, opts.handleResult, function (err, result) {
        if (err) {
          return handleError(err)
        }
        execEach(__, sets, args[0] && path.resolve(process.cwd(), args[0]), execAsync, opts.handleResult, function (err2, result2) {
          if (err2) {
            return handleError(err2)
          }
          var diffs = diff.diffSentences(result, result2)
          if (diffs.length === 1) {
            return callback(null, true, {
              file: path.join(folder, 'review.{lang}.md')
            })
          }
          callback(null, false, '{error.not_same}:\n' + formatDiffs(diffs))
        })
      })
    },
    run: function (args, callback) {
      var sets = opts.createSampleSets()
      var __ = this.i18n.__
      execEach(__, sets, args[0] && path.resolve(process.cwd(), args[0]), getExecAsync(opts), opts.handleResult, function (err, result) {
        if (err) {
          return callback(String(err))
        }
        console.log(result)
        callback()
      })
    }
  }
}
