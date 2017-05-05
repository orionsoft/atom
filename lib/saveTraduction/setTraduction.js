'use babel'

/* global atom */
import getConfig from '../helpers/getConfig'
import fs from 'fs-plus'

export default async function (key, language, value) {
  const i18nPath = getConfig().i18nPaths[0]
  const langRoot = atom.workspace.project.rootDirectories[0].path + '/' + i18nPath
  const parts = key.split('.')
  const last = parts[parts.length - 1]
  const finalPath = langRoot + '/' + parts.slice(0, parts.length - 1).join('/') + '/' + language + '.js'
  const oldContent = fs.readFileSync(finalPath).toString()
  const item = oldContent
  .replace(/(.|\n)*export default /g, '')
  .replace(/({|})/g, '')
  .split('\n')
  .map(line => {
    const parts = line.split(':')
    const name = (parts[0] || '').trim()
    const text = (parts[1] || '').replace(/(,|')/g, '').trim()
    return {
      name,
      text
    }
  })
  .filter(({name, text}) => !!name && !!text)
  .find(({name}) => name === last)

  if (item) {
    const newContent = oldContent.replace(`${item.name}: '${item.text}'`, `${last}: '${value}'`)
    fs.writeFileSync(finalPath, newContent)
  } else {
    if (oldContent.length <= 20) {
      const newContent = oldContent.replace('\n}\n', `  ${last}: '${value}'\n}\n`)
      fs.writeFileSync(finalPath, newContent)
    } else {
      const newContent = oldContent.replace('\n}\n', `,\n  ${last}: '${value}'\n}\n`)
      fs.writeFileSync(finalPath, newContent)
    }
  }
}
