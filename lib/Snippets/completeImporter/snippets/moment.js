'use babel'
import importFile from '../importFile'

export default function ({id, config, lineText, preText, prefix, fileContent, bufferPosition}) {
  const word = 'moment'
  if (prefix.trim().length < 2) return
  if (!word.toLowerCase().startsWith(prefix.toLowerCase())) return
  return {
    snippet: 'moment()',
    displayText: 'moment',
    type: 'snippet',
    description: 'Adds moment and imports the package',
    replacementPrefix: prefix,
    onDidInsertSuggestion: function ({fileContent, editor}) {
      if (/import moment from 'moment'/.test(fileContent)) return
      const newContent = importFile(fileContent, `import moment from 'moment'`)

      const newPosition = {
        row: bufferPosition.row + 1,
        column: preText.length - prefix.length + 7
      }

      editor.setText(newContent)
      editor.setCursorBufferPosition(newPosition)
    }
  }
}
