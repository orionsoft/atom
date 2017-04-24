'use babel'
import importFile from '../importFile'

export default function ({id, config, lineText, preText, prefix, fileContent, bufferPosition}) {
  const word = '@withRouter'
  if (preText.trim().length < 2) return
  if (!word.toLowerCase().startsWith(preText.toLowerCase())) return
  return {
    snippet: '@withRouter',
    displayText: '@withRouter',
    type: 'snippet',
    description: 'Adds withRouter to the class and imports the package',
    replacementPrefix: preText,
    onDidInsertSuggestion: function ({fileContent, editor}) {
      if (/import {withRouter} from 'react-router'/.test(fileContent)) return

      const newContent = importFile(fileContent, `import {withRouter} from 'react-router'`).replace('static propTypes = {', function (input) {
        return `static propTypes = {\n    router: React.PropTypes.object,`
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
