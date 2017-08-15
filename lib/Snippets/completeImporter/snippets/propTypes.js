'use babel'
import importFile from '../importFile'

const propTypes = ['array', 'any', 'object', 'bool', 'string', 'func', 'number', 'node', 'element']

export default function({
  id,
  config,
  lineText,
  nextLine,
  preText,
  prefix,
  fileContent,
  bufferPosition
}) {
  if (prefix.slice(0, 1) !== 'r' || prefix.length < 2) return

  const comma = nextLine === '  }' ? '' : ','

  return propTypes.filter(suggestion => ('r' + suggestion).startsWith(prefix)).map(suggestion => {
    return {
      snippet: `PropTypes.${suggestion}\${1}${comma}`,
      displayText: `PropTypes.${suggestion}`,
      type: 'snippet',
      description: `React prop types ${suggestion}`,
      onDidInsertSuggestion: function({fileContent, editor}) {
        if (/import PropTypes from 'prop-types'/.test(fileContent)) return
        const newContent = importFile(fileContent, `import PropTypes from 'prop-types'`)

        const newPosition = {
          row: bufferPosition.row + 1,
          column: preText.length - prefix.length + `PropTypes.${suggestion}`.length
        }

        editor.setText(newContent)
        editor.setCursorBufferPosition(newPosition)
      }
    }
  })
}
