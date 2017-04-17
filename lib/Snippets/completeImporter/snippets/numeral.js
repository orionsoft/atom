'use babel'

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
      const newContent = fileContent.replace(/import .+\n\n/g, function (input) {
        return input.replace(/\n\n/g, '\n') + `import numeral from 'numeral'\n\n`
      })

      const newPosition = {
        row: bufferPosition.row + 1,
        column: preText.length - prefix.length + 8
      }

      editor.setText(newContent)
      editor.setCursorBufferPosition(newPosition)
    }
  }
}
