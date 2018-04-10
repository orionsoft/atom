// file not used
'use babel'
import importFile from '../importFile'

export default function({id, config, lineText, preText, prefix, fileContent, bufferPosition}) {
  const word = 'getCollection'
  if (prefix.trim().length < 2) return
  if (!word.toLowerCase().startsWith(prefix.toLowerCase())) return
  const snippet = 'const $1 = await getCollection($2)'
  return {
    snippet,
    displayText: 'getCollection',
    type: 'snippet',
    description: 'Adds getCollection and imports the file',
    replacementPrefix: prefix,
    onDidInsertSuggestion: function({fileContent, editor}) {
      const importString = `import getCollection from 'api/helpers/getCollection'`
      if (fileContent.includes(importString)) return
      const newContent = importFile(fileContent, importString)

      const newPosition = {
        row: bufferPosition.row + 1,
        column: preText.length - prefix.length + snippet.length
      }

      editor.setText(newContent)
      editor.setCursorBufferPosition(newPosition)
    }
  }
}
