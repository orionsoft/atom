'use babel'
/* global atom */

import fs from 'fs-plus'

const getIndexContent = function (name) {
  return `
export default function (root, params, context) {

}
`
}

const create = function (path, name) {
  const indexPath = `${path}/${name}.js`
  if (fs.existsSync(indexPath)) {
    return atom.confirm({
      message: `Function ${name} already exists`
    })
  }

  fs.writeFileSync(indexPath, getIndexContent(name))

  // to add to resolvers
  if (!fs.existsSync(`${path}/index.js`)) return
  const content = fs.readFileSync(`${path}/index.js`).toString()
  const newContent = content.replace('\nexport default {', `import ${name} from './${name}'

export default {
  ${name},`)
  fs.writeFileSync(`${path}/index.js`, newContent)
}

export default function (event) {
  const path = event.currentTarget.querySelector('.selected [data-path]').getAttribute('data-path')
  const QuestionDialog = require('../dialogs/question')
  const dialog = new QuestionDialog(path, 'Enter the name of the function')
  dialog.on('answer', (event, name) => {
    create(path, name)
  })
  dialog.attach()
}
