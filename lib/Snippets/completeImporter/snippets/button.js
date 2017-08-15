'use babel'
import importFile from '../importFile'
import isReactNative from '../../../helpers/isReactNative'

export default function({
  id,
  path,
  config,
  lineText,
  preText,
  prefix,
  fileContent,
  bufferPosition
}) {
  const word = 'Button'
  if (prefix.trim().length < 2) return
  if (!word.toLowerCase().startsWith(prefix.toLowerCase())) return
  return {
    snippet: isReactNative(path) ? "<Button title='' />" : '<Button></Button>',
    displayText: '<Button>',
    type: 'snippet',
    description: 'Adds button and imports the package',
    replacementPrefix: prefix,
    onDidInsertSuggestion: function({fileContent, editor}) {
      const importString = isReactNative(path)
        ? "import Button from 'App/components/Button'"
        : "import Button from 'orionsoft-parts/lib/components/Button'"
      if (fileContent.includes(importString)) return
      const newContent = importFile(fileContent, importString)

      const newPosition = {
        row: bufferPosition.row + 1,
        column: preText.length - prefix.length + (isReactNative(path) ? 15 : 9)
      }

      editor.setText(newContent)
      editor.setCursorBufferPosition(newPosition)
    }
  }
}
