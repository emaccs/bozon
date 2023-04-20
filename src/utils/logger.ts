import chalk from 'chalk'
import { Spinner } from 'utils/spinner'

let spinner: Spinner | null = null

interface FormatMessageOptions {
  newLineBefore?: boolean
  skipLineAfter?: boolean
}

const formatMessage = (message: string, options: FormatMessageOptions = {}) => {
  let string = `[${chalk.cyan('bozon')}] ${message}`
  if (options.newLineBefore) {
    string = `\n${string}`
  }
  if (!options.skipLineAfter) {
    string = `${string}\n`
  }
  return string
}

const log = (message, options = {}) => {
  process.stdout.write(formatMessage(message, options))
}

const warn = (message) => {
  log(chalk.yellow(`⚠ ${message}`))
}

const startSpinner = (message) => {
  spinner = new Spinner()
  spinner.start(formatMessage(chalk.bold(message), { skipLineAfter: true }))
}

const stopSpinner = (message, success = true) => {
  if (success) {
    message = `${chalk.bold(message)} ${chalk.green('✓')}`
  } else {
    message = `${chalk.yellow(message)} ${chalk.red('✖')}`
  }
  spinner?.stop(formatMessage(message))
}

export { log, warn, startSpinner, stopSpinner }
