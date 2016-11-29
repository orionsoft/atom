'use babel'

/* global atom */
import fs from 'fs-plus'
import getTemplate from '../getTemplate'

const addToIndex = function (path, name) {
  // to add to resolvers
  if (!fs.existsSync(`${path}/index.js`)) return
  const content = fs.readFileSync(`${path}/index.js`).toString()
  const newContent = content.replace('\nexport default {', `import ${name} from './${name}'

export default {
  ${name},`)
  fs.writeFileSync(`${path}/index.js`, newContent)
}

const create = function (path, name) {
  if (fs.existsSync(`${path}/${name}`)) {
    return atom.confirm({
      message: `Translate group ${name} already exists`
    })
  }

  const main = getTemplate('createTranslationGroup/templates/main.js')
  const lang = getTemplate('createTranslationGroup/templates/lang.js')

  fs.writeFileSync(`${path}/${name}/index.js`, main)
  fs.writeFileSync(`${path}/${name}/es.js`, lang)
  fs.writeFileSync(`${path}/${name}/en.js`, lang)

  addToIndex(path, name)
}

export default function (event) {
  const path = event.currentTarget.querySelector('.selected [data-path]').getAttribute('data-path')
  const QuestionDialog = require('../../dialogs/question')
  const dialog = new QuestionDialog(path, 'Enter the name of the Translation Group')
  dialog.on('answer', (event, name) => {
    create(path, name)
  })
  dialog.attach()
}
