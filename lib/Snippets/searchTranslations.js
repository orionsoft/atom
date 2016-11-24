'use babel'

/* global atom */
import fs from 'fs-plus'
import getTrFileKeys from './getTrFileKeys'

const getPaths = function () {
  try {
    const projectPath = atom.project.getPaths()[0]
    const content = fs.readFileSync(`${projectPath}/.orionsoftrc`).toString()
    const config = JSON.parse(content)
    const paths = config.i18nPaths.map(path => `${projectPath}/${path}`)
    return paths
  } catch (error) {
    return
  }
}

const searchPath = function (path, files, base, allKeys) {
  fs.readdirSync(path).forEach(function (file) {
    const subpath = path + '/' + file
    if (fs.lstatSync(subpath).isDirectory()) {
      searchPath(subpath, files, base, allKeys)
    } else if (file.endsWith('en.js')) {
      getTrFileKeys(`${path}/${file}`, `${base}/`).forEach(key => {
        allKeys.push(key)
      })
      files.push(`${path}/${file}`)
    }
  })
}

let list = []

const getList = function (paths) {
  if (list.length !== 0) return
  const allKeys = []
  paths.forEach(path => {
    searchPath(path, [], path, allKeys)
  })
  list = allKeys
}

export default function (lineText, prefix) {
  if (!lineText.includes('Translate tr')) return
  const paths = getPaths()
  if (!paths) return
  const regex = /Translate tr='(.*)'/g
  const newPrefix = regex.exec(lineText)[1]
  getList(paths)
  return list
  .filter(key => {
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
