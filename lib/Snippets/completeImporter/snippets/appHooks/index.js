'use babel'
import makeImporter from '../../makeImporter'
import debounce from 'lodash/debounce'
import getHooks from './getHooks'

const debouncedGetHooks = debounce(getHooks, 3000, {
  leading: true,
  trailing: false
})

export default function({file, prefix}) {
  const words = debouncedGetHooks(file)

  return words
    .filter(word => {
      if (prefix.trim().length < 2) return false
      if (!word.toLowerCase().startsWith(prefix.toLowerCase())) return false
      return true
    })
    .map(word => {
      return makeImporter({
        displayText: word,
        snippet: `${word}($1)`,
        description: `Imports ${word} hook`,
        imports: `import ${word} from 'App/hooks/${word}'`,
        iconHTML: '<i class="icon-broadcast"></i>',
        type: 'function',
        leftLabel: 'Hook'
      })
    })
}
