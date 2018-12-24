/* eslint-disable no-console */
const strip = require('strip-ansi')

const createLogger = require('..')

describe('log', () => {
  it('should exist', () => {
    expect(createLogger).toBeDefined()
    expect(typeof createLogger).toEqual('function')
  })

  it('should return a logger', () => {
    const log = createLogger({ name: 'wds' })

    expect(log).toBeDefined()
    expect(log.name).toEqual('wds')

    createLogger.deleteLogger('wds')
  })

  it('should return multiple unique loggers', () => {
    const log = createLogger({ name: 'wds', id: 'wds1' })
    const log2 = createLogger({ name: 'wds', id: 'wds2' })

    expect(log).not.toEqual(log2)

    expect(log.name).toEqual('wds')
    expect(log2.name).toEqual('wds')

    expect(/^wds/.test(log.id)).toBeTruthy()
    expect(/^wds/.test(log2.id)).toBeTruthy()

    createLogger.deleteLogger('wds1')
    createLogger.deleteLogger('wds2')
  })

  it('should log for unique loggers', () => {
    const infoMock = jest.spyOn(console, 'info')

    const log = createLogger({ name: 'wds' })
    const log2 = createLogger({ name: 'wdm' })

    log.info('webpack-dev-server')
    log2.info('webpack-dev-middleware')

    const [first] = infoMock.mock.calls[0]
    const [last] = infoMock.mock.calls[infoMock.mock.calls.length - 1]


    expect(infoMock.mock.calls.length).toEqual(2)
    expect(strip(first)).toEqual('ℹ ｢wds｣: webpack-dev-server')
    expect(strip(last)).toEqual('ℹ ｢wdm｣: webpack-dev-middleware')

    createLogger.deleteLogger('wds')
    createLogger.deleteLogger('wdm')
  })

  it('should delete a logger (for tests environments only)', () => {
    const log = createLogger({ name: 'wds' })

    createLogger.deleteLogger('wds')

    const log2 = createLogger({ name: 'wds' })

    expect(log).not.toEqual(log2)

    createLogger.deleteLogger('wds')
  })

  it('cached loggers should share log levels', () => {
    const log = createLogger({ name: 'wds', id: 'foo' })

    log.level = 'silent'

    const log2 = createLogger({ name: 'wds', id: 'foo' })

    expect(log).toEqual(log2)
    expect(log.level).toEqual(log2.level)

    createLogger.deleteLogger('foo')
  })
})
