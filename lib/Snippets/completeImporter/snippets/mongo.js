'use babel'
import fs from 'fs'
import importFile from '../importFile'

const getSnippetForFunction = function (word, {file, preText, prefix, fileContent, bufferPosition}) {
  const match = preText.match(new RegExp(`\\w+\\.${prefix}`, 'g')) || []
  if (!match[0]) return
  const collectionName = match[0].replace(`.${prefix}`, '')
  return {
    snippet: `${word}($1)`,
    displayText: `${collectionName === 'users' ? 'Meteor.users' : collectionName}.${word}`,
    type: 'snippet',
    description: `Adds ${word} and imports ${collectionName === 'users' ? 'Meteor' : `the ${collectionName} collection`}`,
    replacementPrefix: prefix,
    onDidInsertSuggestion: function ({fileContent, editor}) {
      let importString
      if (collectionName === 'users') {
        importString = `import {Meteor} from 'meteor/meteor'`
        if (fileContent.includes(importString)) return
      } else {
        const collectionPath = file.path.replace(/imports\/.*/g, `imports/collections/${collectionName}/index.js`)
        const stat = fs.statSync(collectionPath)
        if (!stat) return
        if (stat.isDirectory()) return
        importString = `import ${collectionName} from 'api/collections/${collectionName}'`
        if (fileContent.includes(`import ${collectionName}`)) return
      }

      const newContent = importFile(fileContent, importString)
      const newPosition = {
        row: bufferPosition.row + 1,
        column: preText.length - prefix.length + word.length + 1
      }

      editor.setText(newContent)
      editor.setCursorBufferPosition(newPosition)
    }
  }
}

export default function ({file, preText, prefix, fileContent, bufferPosition}) {
  if (prefix.trim().length < 2) return
  const snippets = ['find', 'findOne', 'remove', 'update'].map(word => {
    if (!word.toLowerCase().startsWith(prefix.toLowerCase())) return
    return getSnippetForFunction(word, {file, preText, prefix, fileContent, bufferPosition})
  }).filter(snippet => !!snippet)
  console.log(snippets)
  return snippets
}
