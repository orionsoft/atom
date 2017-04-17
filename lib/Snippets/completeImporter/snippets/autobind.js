'use babel'

export default function ({id, config, lineText, preText, prefix, fileContent, bufferPosition}) {
  const word = '  @autobind'
  if (preText.trim().length < 2) return
  if (!word.toLowerCase().startsWith(preText.toLowerCase())) return
  return {
    snippet: '  @autobind',
    displayText: '@autobind',
    type: 'snippet',
    description: 'Adds autobind to a function and imports the package',
    replacementPrefix: preText,
    onDidInsertSuggestion: function ({fileContent, editor}) {
      if (/import autobind from 'autobind-decorator'/.test(fileContent)) return
      const newContent = fileContent.replace(/import .+\n\n/g, function (input) {
        return input.replace(/\n\n/g, '\n') + `import autobind from 'autobind-decorator'\n\n`
      })

      const newPosition = {
        row: bufferPosition.row + 1,
        column: 11
      }

      editor.setText(newContent)
      editor.setCursorBufferPosition(newPosition)
    }
  }
}
