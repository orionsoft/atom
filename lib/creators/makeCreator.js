'use babel'
/* global atom */
import path from 'path'
import fs from 'fs-plus'
import isReactNative from '../helpers/isReactNative'

const getPath = function(event) {
  const filePath = event.currentTarget.querySelector('.selected [data-path]')
    ? event.currentTarget.querySelector('.selected [data-path]').getAttribute('data-path')
    : atom.workspace.getActivePaneItem() && atom.workspace.getActivePaneItem().buffer.file.path
  const isDir = fs.lstatSync(filePath).isDirectory()
  const rootPath = atom.project.rootDirectories[0].path
  const withoutFileName = isDir ? filePath : path.dirname(filePath)
  const basePath = withoutFileName.replace(rootPath, '').replace(/^\//, '') + '/'
  const hiddenPath = rootPath + '/'
  return {basePath, hiddenPath}
}

export default function(create, options = {}) {
  return event => {
    const QuestionDialog = require('../dialogs/question2')
    let {basePath, hiddenPath} = getPath(event)
    if (options.basePath) {
      basePath = options.basePath
    }

    const dialog = new QuestionDialog(basePath, 'Enter the name')
    dialog.on('answer', (event, name) => {
      const parts = name.split('/')
      const parsedName = parts.pop()
      const selectedPath = parts.join('/')

      const createFile = (path, content) => {
        const finalPath = hiddenPath + selectedPath + '/' + path
        if (fs.existsSync(finalPath)) {
          return atom.confirm({
            message: `File ${hiddenPath} already exists`
          })
        }
        fs.writeFileSync(finalPath, content)
        return finalPath
      }

      const openFile = path => {
        const finalPath = hiddenPath + selectedPath + '/' + path
        atom.workspace.open(finalPath)
      }

      create({
        isReactNative: isReactNative(hiddenPath + selectedPath),
        path: hiddenPath + selectedPath,
        name: parsedName,
        createFile,
        openFile
      })
    })
    dialog.attach()
  }
}
