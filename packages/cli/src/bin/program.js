'use strict';

import chalk from 'chalk'
import program from 'commander'
import { Logger } from 'zos-lib'
import { version } from '../../package.json'
import commands from '../commands'
import registerErrorHandler from './errors'

require('./options')

const commandsList = Object.values(commands)
commandsList.forEach(command => command.register(program))
const maxLength = Math.max(...commandsList.map(command => command.signature.length))

program
  .name('zos')
  .usage('<command> [options]')
  .description(`where <command> is one of: ${commandsList.map(c => c.name).join(', ')}`)
  .version(version, '--version')
  .option('-v, --verbose', 'verbose mode on: output errors stacktrace and detailed log.')
  .option('-s, --silent', 'silent mode: no output sent to stderr.')
  .on('option:verbose', () => Logger.verbose(true))
  .on('option:silent', () => Logger.silent(true))
  .on('--help', () => commandsList.forEach(c => console.log(`   ${chalk.bold(c.signature.padEnd(maxLength))}\t${c.description}\n`)));

registerErrorHandler(program)

export default program
