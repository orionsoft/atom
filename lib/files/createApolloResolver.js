'use babel'
/* global atom */

import fs from 'fs-plus'

const getIndexContent = function (name) {
  return `
export default {

}
`
}

const create = function (path, name) {
  const indexPath = `${path}/${name}/index.js`
  if (fs.existsSync(indexPath)) {
    return atom.confirm({
      message: `Resolver ${name} already exists`
    })
  }

  fs.writeFileSync(indexPath, getIndexContent(name))
  atom.workspace.open(indexPath)

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
  const dialog = new QuestionDialog(path, 'Enter the name of the GraphQL Type')
  dialog.on('answer', (event, name) => {
    create(path, name)
  })
  dialog.attach()
}
