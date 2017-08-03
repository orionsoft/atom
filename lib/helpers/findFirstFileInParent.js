'use babel'
/* global atom */
import fs from 'fs-plus'

const search = function (fileName, path) {
  const editor = atom.workspace.getActiveTextEditor()
  if (!editor) throw new Error('No active text editor')
  path = path || editor.buffer.file.path
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
