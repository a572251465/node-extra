const path = require('path')
const { fs: utils } = require('../../dist/index')

const toPath = path.resolve(__dirname, './to__')
utils.rmFile(toPath)
