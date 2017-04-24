'use babel'
/* global atom */

import fs from 'fs-plus'
import snakeHighToLower from '../helpers/snakeHighToLower'

const getIndexContent = function (path, name) {
  const isType = path.includes('Types')
  const parent = isType ? snakeHighToLower(path.split('/')[path.split('/').length - 1]) : 'root'
  return `import resolver from 'paginated-graphql/lib/resolver'

export default resolver({
  collection: , // Meteor collection
  allowedSort: [], // fields that can be sorted
  fields: [], // fields that can be searched
  transformQuery (query, ${parent}, params, {userId}) {
    return query
  }
})
`
}

const create = function (path, name) {
  const indexPath = `${path}/${name}.js`
  if (fs.existsSync(indexPath)) {
    return atom.confirm({
      message: `Function ${name} already exists`
    })
  }

  fs.writeFileSync(indexPath, getIndexContent(path, name))
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
  const dialog = new QuestionDialog(path, 'Enter the name of the function')
  dialog.on('answer', (event, name) => {
    create(path, name)
  })
  dialog.attach()
}
