'use babel'
import importFile from '../importFile'

export default function ({id, config, lineText, preText, prefix, fileContent, bufferPosition}) {
  const word = '@withMessage'
  if (preText.trim().length < 2) return
  if (!word.toLowerCase().startsWith(preText.toLowerCase())) return
  return {
    snippet: '@withMessage',
    displayText: '@withMessage',
    type: 'snippet',
    description: 'Adds withMessage to the class and imports the package',
    replacementPrefix: preText,
    onDidInsertSuggestion: function ({fileContent, editor}) {
      if (/import withMessage from 'orionsoft-parts\/lib\/decorators\/withMessage'/.test(fileContent)) return

      const newContent = importFile(fileContent, `import withMessage from 'orionsoft-parts/lib/decorators/withMessage'`).replace('static propTypes = {', function (input) {
        return `static propTypes = {\n    showMessage: PropTypes.func,`
      })

      const newPosition = {
        row: bufferPosition.row + 1,
        column: 12
      }

      editor.setText(newContent)
      editor.setCursorBufferPosition(newPosition)
    }
  }
}
