const fs = require('fs')
const path = require('path')

/**
 * @author lihh
 * @description 判断文件是否存在
 * @param {*} filePath 文件路径
 */
const isFileExists = (filePath: string): boolean => {
  try {
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      return false
    }
    return true
  } catch (e) {
    return false
  }
}

/**
 * @author lihh
 * @description 判断是否是目录
 * @param {*} dirPath
 * @returns
 */
const isDirExists = (dirPath: string): boolean => {
  try {
    const stats = fs.statSync(dirPath)
    if (stats.isFile()) {
      return false
    }
    return true
  } catch (e) {
    return false
  }
}

/**
 * @author lihh
 * @description 指定文件写入内容
 * @param {*} dir 写入地址
 * @param {*} content 写入内容
 * @param {*} spaces 写入的时候 保持的空格
 */
const wContent = (
  dir: string,
  content: string | object,
  spaces: number = 2
) => {
  const stream = fs.createWriteStream(dir)
  stream.write(
    typeof content === 'string'
      ? content
      : JSON.stringify(content, null, spaces)
  )
  stream.close()
}

/**
 * @author lihh
 * @description 删除文件 可以是目录 || 具体文件
 * @param dir 表示删除目录
 */
const rmFile = (dir: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    const run = (dirs: string[]) => {
      try {
        let i = 0
        for (; i < dirs.length; i += 1) {
          const name = dirs[i]
          const status = isFileExists(name)
          if (status) {
            fs.unlinkSync(name)
          } else {
            const dirList = fs.readdirSync(name)
            if (dirList.length === 0) {
              fs.rmdirSync(name)
              return
            }

            const newDir = dirList.map((filename: string) =>
              path.resolve(name, filename)
            )
            run(newDir)
            if (isDirExists(name)) {
              fs.rmdirSync(name)
            }
          }
        }
      } catch (e) {
        console.log(e)
        reject()
      }
    }
    run([dir])
    resolve(true)
  })

/**
 * @author lihh
 * @description 进行文件移动
 * @param fromPath 来自的文件
 * @param toPath 去向的文件
 */
const cpFile = (fromPath: string, toPath: string): Promise<boolean> =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      if (isDirExists(toPath)) {
        await rmFile(toPath)
      }
      fs.mkdirSync(toPath)

      const run = (targetPath: string, suffix?: string) => {
        const dirList = fs.readdirSync(targetPath)
        if (dirList.length === 0) {
          return
        }
        let i = 0
        for (; i < dirList.length; i += 1) {
          const afterSuffix = suffix
            ? path.join(suffix, dirList[i])
            : dirList[i]
          const newPath = path.resolve(fromPath, afterSuffix)
          const stat = fs.statSync(newPath)
          const toNewPath = path.resolve(toPath, afterSuffix)
          if (stat.isDirectory()) {
            if (!isDirExists(toNewPath)) {
              fs.mkdirSync(toNewPath)
            }
            run(newPath, afterSuffix)
          }
          if (stat.isFile()) {
            fs.copyFileSync(newPath, toNewPath)
          }
        }
      }
      run(fromPath)
      resolve(true)
    } catch (e) {
      console.log(e)
      reject(new Error(''))
    }
  })
export default {
  isFileExists,
  isDirExists,
  wContent,
  cpFile,
  rmFile
}
