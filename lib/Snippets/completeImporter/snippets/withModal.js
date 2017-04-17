'use babel'

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

      const newContent = fileContent.replace(/import .+\n\n/g, function (input) {
        return input.replace(/\n\n/g, '\n') + `import withModal from 'orionsoft-parts/lib/decorators/withModal'\n\n`
      }).replace('static propTypes = {', function (input) {
        return `static propTypes = {\n    showModal: React.PropTypes.func,`
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
