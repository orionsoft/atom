'use babel'
import makeImporter from '../makeImporter'

export default function({id, config, lineText, preText, prefix, fileContent, bufferPosition}) {
  const word = 'useMutation'

  if (prefix.trim().length < 2) return
  if (!word.toLowerCase().startsWith(prefix.toLowerCase())) return

  return makeImporter({
    displayText: 'useMutation',
    snippet: `const mutate = useMutation(gql\`
  mutation {
    $1
  }
\`)`,
    description: 'Imports useMutation hook',
    imports: [
      `import useMutation from 'apollo-hooks/lib/useMutation'`,
      `import gql from 'graphql-tag'`
    ],
    iconHTML: '<i class="icon-radio-tower"></i>',
    type: 'function',
    leftLabel: 'Hook'
  })
}
