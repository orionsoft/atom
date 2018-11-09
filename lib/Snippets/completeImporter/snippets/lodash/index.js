'use babel'
import makeImporter from '../../makeImporter'
import getItems from './getItems'

let items = null

export default function({file, prefix}) {
  items = items || getItems(file)

  return items
    .filter(({name}) => {
      if (prefix.trim().length < 2) return false
      if (!name.toLowerCase().startsWith(prefix.toLowerCase())) return false
      return true
    })
    .map(({name}) => {
      return makeImporter({
        displayText: name,
        snippet: `${name}`,
        description: `Imports "${name}" lodash function`,
        imports: `import ${name} from 'lodash/${name}'`,
        iconHTML: '_',
        type: 'function',
        leftLabel: `Lodash`
      })
    })
}
