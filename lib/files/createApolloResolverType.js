'use babel'
/* global atom */

import fs from 'fs-plus'
import snakeHighToLower from '../helpers/snakeHighToLower'
import getFilesInDir from '../helpers/getFilesInDir'

const findParams = function (path, type, name) {
  const schemaDir = path.replace(/imports\/apollo.*/g, 'imports/apollo/schema')
  const filesToSearch = getFilesInDir(schemaDir).filter(file => file.endsWith('.graphql'))
  for (const filePath of filesToSearch) {
    const content = fs.readFileSync(filePath).toString()
    if (!new RegExp(`type ${type}`, 'g').test(content)) continue
    const typeDef = (content.match(new RegExp(`type ${type} {[\\w\\n:!()#, [\\]]+}`, 'g')) || [])[0]
    if (!typeDef) continue
    const resolver = (new RegExp(`${name} ?\\(([\\w\\n:!#, [\\]]+)\\) ?:`, 'g').exec(typeDef) || [])[1]
    if (!resolver) continue
    const regex = /(\w+):/g
    let match
    const fields = []
    while ((match = regex.exec(resolver)) !== null) {
      if (match.index === regex.lastIndex) {
        regex.lastIndex++
      }
      match.forEach((match, groupIndex) => {
        if (groupIndex === 1) {
          fields.push(match)
        }
      })
    }
    if (fields.length) {
      return `{${fields.join(', ')}}`
    }
  }
}

const getIndexContent = function (path, name) {
  const isType = path.includes('Types')
  const isMutation = path.includes('Mutation')
  const type = isType ? path.split('/')[path.split('/').length - 1] : isMutation ? 'Mutation' : 'Query'
  const parent = isType ? snakeHighToLower(path.split('/')[path.split('/').length - 1]) : 'root'
  const params = findParams(path, type, name) || 'params'
  return `
export default function (${parent}, ${params}, context) {

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
