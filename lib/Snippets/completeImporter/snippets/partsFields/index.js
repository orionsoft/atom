'use babel'
import makeImporter from '../../makeImporter'
import debounce from 'lodash/debounce'
import getItems from './getItems'

const debouncedGetItems = debounce(getItems, 3000, {
  leading: true,
  trailing: false
})

export default function({file, prefix}) {
  const words = debouncedGetItems(file)

  return words
    .filter(word => {
      if (prefix.trim().length < 2) return false
      if (!word.toLowerCase().startsWith(prefix.toLowerCase())) return false
      return true
    })
    .map(word => {
      return makeImporter({
        displayText: word,
        snippet: `<${word}>$1</${word}>`,
        description: `Imports ${word} Orionsoft field`,
        imports: `import ${word} from 'orionsoft-parts/lib/components/fields/${word}'`,
        iconHTML: '<i class="icon-rocket"></i>',
        type: 'component',
        leftLabel: 'Parts'
      })
    })
}
