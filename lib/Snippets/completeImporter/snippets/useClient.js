'use babel'
import makeImporter from '../makeImporter'

export default function ({id, config, lineText, preText, prefix, fileContent, bufferPosition}) {
  const word = 'useClient'

  if (prefix.trim().length < 2) return
  if (!word.toLowerCase().startsWith(prefix.toLowerCase())) return

  return makeImporter({
    displayText: 'useClient',
    snippet: `const client = useClient()`,
    description: 'Imports useClient hook',
    imports: [`import useClient from 'apollo-hooks/lib/useClient'`],
    iconHTML: '<i class="icon-radio-tower"></i>',
    type: 'function',
    leftLabel: 'Hook'
  })
}
