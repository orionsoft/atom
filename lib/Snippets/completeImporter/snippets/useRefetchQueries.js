'use babel'
import makeImporter from '../makeImporter'

export default function ({id, config, lineText, preText, prefix, fileContent, bufferPosition}) {
  const word = 'useRefetchQueries'

  if (prefix.trim().length < 2) return
  if (!word.toLowerCase().startsWith(prefix.toLowerCase())) return

  return makeImporter({
    displayText: 'useRefetchQueries',
    snippet: `const refetch = useRefetchQueries()`,
    description: 'Imports useRefetchQueries hook',
    imports: [`import useRefetchQueries from 'apollo-hooks/lib/useRefetchQueries'`],
    iconHTML: '<i class="icon-radio-tower"></i>',
    type: 'function',
    leftLabel: 'Hook'
  })
}
