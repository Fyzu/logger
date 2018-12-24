[![deps][deps]][deps-url]

## Install

```bash
npm i -D @fyzu/logger
```

> ⚠️ We do not recommend installing this module globally

## Usage

```js
const createLogger = require('@fyzu/logger')
const logger = createLogger({ name: 'wds' })

logger.info('Server Starting')
```

## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|[**`name`**](#name)|`{String}`|`''<unknown>'`|Log Name (**Required**)|
|[**`level`**](#level)|`{String}`|`'info'`|Log Level|
|[**`unique`**](#unique)|`{String}`|`true`|Log Uniqueness|
|[**`timestamp`**](#timestamp)|`{Boolean}`|`false`|Log Timestamps|

### `name`  

Specifies the name of the log to create. **This option is required**, and used to differentiate between loggers when `webpack-log` is used in multiple projects
executing in the same process

```js
const logger = createLogger({ name: 'wds' })
```

### `level`   

Specifies the level the logger should use. A logger will not produce output for
any log level _beneath_ the specified level. Available levels and order are:

```js
[
  'info',
  'warn',
  'error',
  'trace',
  'debug',
  'silent'
]
```

```js
const logger = createLogger({ level: 'error' })

logger.error(err)
```

> ℹ️ The level names shown above correspond to the available logging methods,
with the notable exception of the `silent` level

### `timestamp`

If `true`, instructs the logger to display a timestamp for log output, preceding
all other data

```js
const logger = createLogger({ timestamp: true })
```

[deps]: https://david-dm.org/fyzu/logger.svg
[deps-url]: https://david-dm.org/fyzu/logger
