'use babel'
import importFile from '../importFile'

export default function ({id, config, lineText, preText, prefix, fileContent, bufferPosition}) {
  const word = 'numeral'
  if (prefix.trim().length < 2) return
  if (!word.toLowerCase().startsWith(prefix.toLowerCase())) return
  return {
    snippet: 'numeral()',
    displayText: 'numeral',
    type: 'snippet',
    description: 'Adds numeral and imports the package',
    replacementPrefix: prefix,
    onDidInsertSuggestion: function ({fileContent, editor}) {
      if (/import numeral from 'numeral'/.test(fileContent)) return
      const newContent = importFile(fileContent, `import numeral from 'numeral'`)

      const newPosition = {
        row: bufferPosition.row + 1,
        column: preText.length - prefix.length + 8
      }

      editor.setText(newContent)
      editor.setCursorBufferPosition(newPosition)
    }
  }
}
