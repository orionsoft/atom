'use babel'
/* global atom */

import fs from 'fs-plus'

const getIndexContent = function (name) {
  return `import React from 'react'
import styles from './styles.css'

export default class ${name} extends React.Component {

  static propTypes = {

  }

  render () {
    return (
      <div className={styles.container}>
        ${name}
      </div>
    )
  }

}
`
}

const getStylesContent = function (name) {
  return `:local(.container) {

}
`
}

const create = function (path, name) {
  const indexPath = `${path}/${name}/index.js`
  const stylesPath = `${path}/${name}/styles.css`
  if (fs.existsSync(indexPath) || fs.existsSync(stylesPath)) {
    return atom.confirm({
      message: `Component ${name} already exists`
    })
  }

  fs.writeFileSync(indexPath, getIndexContent(name))
  fs.writeFileSync(stylesPath, getStylesContent(name))
}

export default function (event) {
  const path = event.currentTarget.querySelector('.selected [data-path]').getAttribute('data-path')
  const QuestionDialog = require('./dialogs/question')
  const dialog = new QuestionDialog(path, 'Enter the name of the React Component')
  dialog.on('answer', (event, name) => {
    create(path, name)
  })
  dialog.attach()
}
