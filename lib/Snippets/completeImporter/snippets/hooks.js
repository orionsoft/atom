'use babel'
import makeImporter from '../makeImporter'

export default function({id, config, lineText, preText, prefix, fileContent, bufferPosition}) {
  const words = [
    'useState',
    'useEffect',
    'useContext',
    'useReducer',
    'useCallback',
    'useMemo',
    'useRef'
  ]

  return words
    .filter(word => {
      if (prefix.trim().length < 2) return false
      if (!word.toLowerCase().startsWith(prefix.toLowerCase())) return false
      return true
    })
    .map(word => {
      return makeImporter({
        displayText: word,
        snippet: word,
        description: `Imports ${word} hook`,
        imports: `import React, {${word}} from 'react'`,
        iconHTML: 'H',
        type: 'function',
        leftLabel: 'Hook'
      })
    })
}
