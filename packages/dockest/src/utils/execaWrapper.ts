import execa, { SyncOptions } from 'execa' // eslint-disable-line import/default
import { trim } from './trim'
import { Logger } from '../Logger'
import { Runner } from '../@types'

interface Opts {
  runner?: Runner
  logPrefix?: string
  logStdout?: boolean
  execaOpts?: SyncOptions<string>
}

export const execaWrapper = async (command: string, opts: Opts = {}) => {
  const trimmedCommand = trim(command)
  const { runner, logPrefix = '[Shell]', logStdout = false, execaOpts = {} } = opts
  const logger = runner ? runner.logger : Logger

  logger.debug(`${logPrefix} <${trimmedCommand}>`)
  const { exitCode, stderr, stdout } = execa.commandSync(trimmedCommand, {
    shell: true,
    ...execaOpts,
  })
  logStdout && logger.debug(`${logPrefix} Success (${stdout})`, { success: true })

  return {
    exitCode,
    stderr,
    stdout,
  }
}