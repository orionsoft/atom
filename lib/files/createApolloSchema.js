'use babel'
/* global atom */

import fs from 'fs-plus'

const getIndexContent = function (path, name) {
  const isType = path.includes('Types')
  const isMutation = path.includes('Mutation')
  const type = isType ? name : isMutation ? 'Mutation' : 'Query'
  return `type ${type} {

}
`
}

const create = function (path, name) {
  const indexPath = `${path}/${name}.graphql`
  if (fs.existsSync(indexPath)) {
    return atom.confirm({
      message: `Schema ${name} already exists`
    })
  }

  fs.writeFileSync(indexPath, getIndexContent(path, name))
  atom.workspace.open(indexPath)

  // to add to resolvers
  if (!fs.existsSync(`${path}/index.js`)) return
  const content = fs.readFileSync(`${path}/index.js`).toString()
  const newContent = content.replace('\nexport default [', `import ${name} from './${name}.graphql'

export default [
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
