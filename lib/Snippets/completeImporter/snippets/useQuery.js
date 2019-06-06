'use babel'
import makeImporter from '../makeImporter'

export default function({id, config, lineText, preText, prefix, fileContent, bufferPosition}) {
  const word = 'useQuery'

  if (prefix.trim().length < 2) return
  if (!word.toLowerCase().startsWith(prefix.toLowerCase())) return

  return makeImporter({
    displayText: 'useQuery',
    snippet: `const {$2} = useQuery({
  query: gql\`
    query {
      $1
    }
  \`,
  variables: {}
})`,
    description: 'Imports useQuery hook',
    imports: [
      `import useQuery from 'apollo-hooks/lib/useApolloQuery'`,
      `import gql from 'graphql-tag'`
    ],
    iconHTML: '<i class="icon-radio-tower"></i>',
    type: 'function',
    leftLabel: 'Hook'
  })
}
