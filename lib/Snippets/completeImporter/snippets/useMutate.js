'use babel'
import makeImporter from '../makeImporter'

export default function({id, config, lineText, preText, prefix, fileContent, bufferPosition}) {
  const word = 'useMutate'

  if (prefix.trim().length < 2) return
  if (!word.toLowerCase().startsWith(prefix.toLowerCase())) return

  return makeImporter({
    displayText: 'useMutate',
    snippet: `const mutate = useMutate()`,
    description: 'Imports useMutate hook',
    imports: [
      `import useMutate from 'apollo-hooks/lib/useMutate'`,
      `import gql from 'graphql-tag'`
    ],
    iconHTML: '<i class="icon-radio-tower"></i>',
    type: 'function',
    leftLabel: 'Hook'
  })
}
