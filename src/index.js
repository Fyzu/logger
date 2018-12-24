const colors = require('ansi-colors')
const loglevel = require('loglevelnext')

const symbols = {
  trace: colors.grey('₸'),
  debug: colors.cyan('➤'),
  info: colors.blue(colors.symbols.info),
  warn: colors.yellow(colors.symbols.warning),
  error: colors.red(colors.symbols.cross),
}

const defaults = {
  name: '<unknown>',
  level: 'info',
}

const prefix = {
  level(options) {
    return symbols[options.level]
  },
  template: `{{level}} ${colors.gray('｢{{name}}｣')}: `,
}

function createLogger(options) {
  const opts = Object.assign({}, defaults, options)

  opts.prefix = Object.assign({}, prefix, options.prefix)
  opts.id = opts.id || opts.name

  if (opts.timestamp) {
    opts.prefix.template = `[{{time}}] ${opts.prefix.template}`
  }

  const logger = loglevel.create(opts)

  if (!Object.prototype.hasOwnProperty.call(logger, 'id')) {
    Object.defineProperty(logger, 'id', {
      get() {
        return opts.id
      },
    })
  }

  return logger
}

function deleteLogger(id) {
  delete loglevel.loggers[id]
}

module.exports = createLogger
// NOTE: this is exported so that consumers of webpack-log can use the same
// version of ansi-colors to decorate log messages without incurring additional
// dependency overhead
module.exports.colors = colors

module.exports.deleteLogger = deleteLogger
