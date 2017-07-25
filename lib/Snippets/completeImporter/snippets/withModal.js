'use babel'
import importFile from '../importFile'

export default function ({id, config, lineText, preText, prefix, fileContent, bufferPosition}) {
  const word = '@withModal'
  if (preText.trim().length < 2) return
  if (!word.toLowerCase().startsWith(preText.toLowerCase())) return
  return {
    snippet: '@withModal',
    displayText: '@withModal',
    type: 'snippet',
    description: 'Adds withModal to the class and imports the package',
    replacementPrefix: preText,
    onDidInsertSuggestion: function ({fileContent, editor}) {
      if (/import withModal from 'orionsoft-parts\/lib\/decorators\/withModal'/.test(fileContent)) return

      const newContent = importFile(fileContent, `import withModal from 'orionsoft-parts/lib/decorators/withModal'`).replace('static propTypes = {', function (input) {
        return `static propTypes = {\n    showModal: PropTypes.func,`
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
