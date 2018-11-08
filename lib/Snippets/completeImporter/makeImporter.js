'use babel'
import addImport from '../../helpers/addImport'
import isArray from 'lodash/isArray'

export default function({snippet, displayText, type = 'snippet', imports, ...otherOptions}) {
  return {
    snippet: snippet,
    displayText: displayText || snippet,
    type,
    ...otherOptions,
    onDidInsertSuggestion: function({fileContent, editor}) {
      const allImports = isArray(imports) ? imports : [imports]

      for (const imports of allImports) {
        if (fileContent.includes(imports)) return

        const bufferPosition = editor.getCursorBufferPosition()

        const newPosition = {
          row: bufferPosition.row + 1,
          column: bufferPosition.column
        }

        fileContent = addImport(fileContent, imports)
        editor.setText(fileContent)
        editor.setCursorBufferPosition(newPosition)
      }
    }
  }
}
