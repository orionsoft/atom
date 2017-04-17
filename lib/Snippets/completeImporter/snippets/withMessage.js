'use babel'

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

      const newContent = fileContent.replace(/import .+\n\n/g, function (input) {
        return input.replace(/\n\n/g, '\n') + `import withMessage from 'orionsoft-parts/lib/decorators/withMessage'\n\n`
      }).replace('static propTypes = {', function (input) {
        return `static propTypes = {\n    showMessage: React.PropTypes.func,`
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
