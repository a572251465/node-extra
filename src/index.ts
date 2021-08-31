const { isFileExists, isDirExists, wContent, cpFile, rmFile } =
  require('./fs').default
const runCommand = require('./process').default

module.exports = {
  fs: {
    isFileExists,
    isDirExists,
    wContent,
    cpFile,
    rmFile
  },
  process: {
    runCommand
  }
}
