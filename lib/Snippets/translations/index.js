'use babel'

/* global atom */
import getList from './getList'

const getPaths = function (config) {
  try {
    const projectPath = atom.project.getPaths()[0]
    const paths = config.i18nPaths.map(path => `${projectPath}/${path}`)
    return paths
  } catch (error) {
    return
  }
}

export default async function ({id, config, lineText, prefix}) {
  if (!lineText.includes('Translate tr')) return
  const paths = getPaths(config)
  if (!paths) return
  const regex = /Translate tr='(.*)'/g
  const newPrefix = regex.exec(lineText)[1]
  const list = await getList(paths, id)
  return list.filter(key => {
    return key.key.toLowerCase().includes(newPrefix.toLowerCase()) || key.text.toLowerCase().includes(newPrefix.toLowerCase())
  })
  .map(key => {
    if (key.key.toLowerCase() === newPrefix.toLowerCase() || key.text.toLowerCase() === newPrefix.toLowerCase()) {
      key.rules = 3
    } else if (key.key.toLowerCase().startsWith(newPrefix.toLowerCase()) || key.text.toLowerCase().startsWith(newPrefix.toLowerCase())) {
      key.rules = 2
    } else {
      key.rules = 1
    }
    return key
  })
  .sort((a, b) => {
    return b.rules - a.rules
  })
  .map(item => {
    return {
      snippet: item.key,
      displayText: item.key,
      type: 'value',
      description: item.text,
      replacementPrefix: newPrefix
    }
  })
}
