const path = require('path')
const { fs: utils } = require('../../dist/index')

const fromPath = path.resolve(__dirname, './from')
const toPath = path.resolve(__dirname, './to')
utils.cpFile(fromPath, toPath)
