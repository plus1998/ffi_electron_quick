import isDevelop from 'electron-is-dev'

const path = require('path')
const os = require('os')
const fs = require('fs')

const baseDir = os.homedir() + '\\Documents\\ffi_electron_quick'

try {
  fs.mkdirSync(baseDir)
} catch (error) {
  console.log('应用文档文件夹已存在')
}

const libDir = path.join(__dirname, isDevelop ? '../../src/main/library' : '../../../library')


export { libDir, baseDir }
