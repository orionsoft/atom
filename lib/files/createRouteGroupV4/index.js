'use babel'
/* global atom */

import fs from 'fs-plus'
import isReactNative from '../../helpers/isReactNative'
import getIndexContent from './getIndexContent'
import getStylesContent from './getStylesContent'

const create = function (path, name, isRN) {
  const indexPath = `${path}/${name}/index.js`
  const stylesPath = `${path}/${name}/styles.${isRN ? 'js' : 'css'}`
  if (fs.existsSync(indexPath) || fs.existsSync(stylesPath)) {
    return atom.confirm({
      message: `Component ${name} already exists`
    })
  }

  fs.writeFileSync(indexPath, getIndexContent(name, isRN))
  fs.writeFileSync(stylesPath, getStylesContent(name, isRN))
  atom.workspace.open(indexPath)
}

export default function (event) {
  const path = event.currentTarget.querySelector('.selected [data-path]').getAttribute('data-path')
  const QuestionDialog = require('../../dialogs/question')
  const dialog = new QuestionDialog(path, 'Enter the name of the React Component')
  dialog.on('answer', (event, name) => {
    create(path, name, isReactNative(path))
  })
  dialog.attach()
}
