import { LogLevel } from 'loglevelnext'
import * as ansiColors from 'ansi-colors'

export type Logger = LogLevel

export interface LoggerOptions {
  name: string,
  id?: string,
  level?: 'debug' | 'error' | 'info' | 'trace' | 'warn' | 'silent',
  template?: string,
}

export const colors: typeof ansiColors

export default function createLogger(options: LoggerOptions): Logger
