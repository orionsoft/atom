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
      provider(lineText, prefix).forEach(suggestion => suggestions.push(suggestion))
    })

    return suggestions
  }

}
