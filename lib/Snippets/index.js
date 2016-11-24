'use babel'

import searchTranslations from './searchTranslations'

const providers = [searchTranslations]

export default class Snippets {
  selector = '.source.js'
  inclusionPriority = 1

  getSuggestions ({editor, bufferPosition, prefix}) {
    const lineText = editor.buffer.lines[bufferPosition.row]
    const suggestions = []

    providers.forEach(provider => {
      try {
        const result = provider(lineText, prefix) || []
        result.forEach(suggestion => suggestions.push(suggestion))
      } catch (error) {
        console.log('Orionsoft snippets error', error)
      }
    })

    return suggestions
  }

}
