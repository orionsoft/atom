'use babel'
import importFile from '../importFile'

export default function ({id, config, lineText, preText, prefix, fileContent, bufferPosition}) {
  const word = '@withApollo'
  if (preText.trim().length < 2) return
  if (!word.toLowerCase().startsWith(preText.toLowerCase())) return
  return {
    snippet: '@withApollo',
    displayText: '@withApollo',
    type: 'snippet',
    description: 'Adds withApollo to the class and imports the package',
    replacementPrefix: preText,
    onDidInsertSuggestion: function ({fileContent, editor}) {
      if (/import \{withApollo\} from 'react-apollo'/.test(fileContent)) return

      const newContent = importFile(fileContent, `import {withApollo} from 'react-apollo'`).replace('static propTypes = {', function (input) {
        return `static propTypes = {\n    client: PropTypes.object,`
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
