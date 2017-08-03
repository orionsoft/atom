'use babel'
import fs from 'fs-plus'

const search = function (fileName, path) {
  const lastPart = path.replace(/\/[^/]+$/, '')
  const searchPath = lastPart + '/' + fileName
  try {
    return fs.readFileSync(searchPath).toString()
  } catch (error) {
    if (!lastPart) {
      throw new Error('File not found')
    }
    return search(fileName, lastPart)
  }
}

export default search
