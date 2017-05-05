'use babel'

/* global atom */
import fs from 'fs-plus'
import getTemplate from '../getTemplate'
import getConfig from '../../helpers/getConfig'

const addToIndex = function (path, name) {
  // to add to resolvers
  if (!fs.existsSync(`${path}/index.js`)) return
  const content = fs.readFileSync(`${path}/index.js`).toString()
  const newContent = content.replace('\nexport default {', `import ${name} from './${name}'

export default {
  ${name},`)
  fs.writeFileSync(`${path}/index.js`, newContent)
}

const getMain = function (languages) {
  return `${languages.map(lang => `import ${lang} from './${lang}'`).join('\n')}

export default {
  ${languages.join(',\n  ')}
}
`
}

const create = function (path, name, languages) {
  if (fs.existsSync(`${path}/${name}`)) {
    return atom.confirm({
      message: `Translate group ${name} already exists`
    })
  }

  const main = getMain(languages)
  const lang = getTemplate('createTranslationGroup/templates/lang.js')

  fs.writeFileSync(`${path}/${name}/index.js`, main)
  for (const language of languages) {
    fs.writeFileSync(`${path}/${name}/${language}.js`, lang)
  }

  addToIndex(path, name)
}

export default function (event) {
  const i18nLanguages = getConfig().i18nLanguages
  if (!i18nLanguages) {
    return atom.notifications.addError('Error: i18nLanguages not found in .orionsoftrc')
  }
  const path = event.currentTarget.querySelector('.selected [data-path]').getAttribute('data-path')
  const QuestionDialog = require('../../dialogs/question')
  const dialog = new QuestionDialog(path, 'Enter the name of the Translation Group')
  dialog.on('answer', (event, name) => {
    create(path, name, i18nLanguages)
  })
  dialog.attach()
}
