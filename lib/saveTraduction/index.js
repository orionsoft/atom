'use babel'

import prompt from '../helpers/prompt'
import getConfig from '../helpers/getConfig'
import getTrFileKeys from '../Snippets/translations/getTrFileKeys'
import setTraduction from './setTraduction'
import importFile from '../helpers/importFile'
/* global atom */

export default async function () {
  const i18nPath = getConfig().i18nPaths[0]
  if (!i18nPath) {
    return atom.notifications.addError('Error: a i18nPath not found in .orionsoftrc')
  }
  const i18nLanguages = getConfig().i18nLanguages
  if (!i18nLanguages) {
    return atom.notifications.addError('Error: i18nLanguages not found in .orionsoftrc')
  }

  const langRoot = atom.workspace.project.rootDirectories[0].path + '/' + i18nPath

  const {key} = await prompt({
    title: 'Key',
    fields: {
      key: {
        placeholder: 'Key',
        type: 'text'
      }
    }
  })

  const parts = key.split('.')
  // const last = parts[parts.length - 1]
  const finalPath = langRoot + '/' + parts.slice(0, parts.length - 1).join('/')

  const fields = {}
  for (const language of i18nLanguages) {
    try {
      const keys = await getTrFileKeys(finalPath + '/' + language + '.js', langRoot + '/', language)
      const value = (keys.find(traduction => traduction.key === key) || {text: ''}).text
      fields[language] = {
        placeholder: `Language ${language}`,
        type: 'text',
        initialValue: value
      }
    } catch (error) {
      console.log('Error:', error)
      atom.notifications.addError(error.message)
    }
  }

  const result = await prompt({
    title: 'Transations',
    fields
  })

  for (const language of i18nLanguages) {
    const value = result[language]
    await setTraduction(key, language, value)
  }

  atom.workspace.getActiveTextEditor().insertText(`<Translate tr='${key}' />`)
  importFile(`import Translate from 'App/i18n'`)

  atom.notifications.addSuccess('Translation saved')
}
