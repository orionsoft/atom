'use babel'
/* global atom */

import fs from 'fs-plus'

const getIndexContent = function (name) {
  return `import {Meteor} from 'meteor/meteor'
import Schema from './Schema'

const ${name} = new Meteor.Collection('${name.toLowerCase()}')

${name}.attachSchema(Schema)

global.${name} = ${name}

export default ${name}
`
}

const getSchemaContent = function (name) {
  return `import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({

})
`
}

const create = function (path, name) {
  const indexPath = `${path}/${name}/index.js`
  const schemaPath = `${path}/${name}/Schema.js`
  if (fs.existsSync(indexPath) || fs.existsSync(schemaPath)) {
    return atom.confirm({
      message: `Collection ${name} already exists`
    })
  }

  fs.writeFileSync(indexPath, getIndexContent(name))
  fs.writeFileSync(schemaPath, getSchemaContent(name))
  atom.workspace.open(indexPath)
  atom.workspace.open(schemaPath)
}

export default function (event) {
  const path = event.currentTarget.querySelector('.selected [data-path]').getAttribute('data-path')
  const QuestionDialog = require('../dialogs/question')
  const dialog = new QuestionDialog(path, 'Enter the name of the Collection')
  dialog.on('answer', (event, name) => {
    create(path, name)
  })
  dialog.attach()
}
