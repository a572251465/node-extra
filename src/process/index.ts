const cp = require('child_process')

// -- 可以覆盖的参数11
interface IOptions {
  cwd?: string
  env?: object
  argv0?: string
  stdio?: string
  detach?: boolean
  uid?: number
  gid?: number
  shell?: boolean | string
  timeout?: number
}

const runCommand = (
  command: string,
  args: string[],
  options: IOptions
): Promise<void> =>
  new Promise((resolve, reject) => {
    const executedCommand = cp.spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    })

    // fail
    executedCommand.on('error', (error: string | undefined) => {
      reject(new Error(error))
    })

    // success
    executedCommand.on('exit', (code: number) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(''))
      }
    })
  })

export { runCommand }
