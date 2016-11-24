'use babel'
/* global atom */
import searchTranslations from './searchTranslations'
import fs from 'fs-plus'

const providers = [searchTranslations]

export default class Snippets {
  selector = '.source.js'
  inclusionPriority = 1

  getConfig () {
    try {
      const projectPath = atom.project.getPaths()[0]
      const content = fs.readFileSync(`${projectPath}/.orionsoftrc`).toString()
      return JSON.parse(content)
    } catch (error) {
      console.log('Error:', error)
      return {}
    }
  }

  getSuggestions ({editor, bufferPosition, prefix}) {
    const lineText = editor.buffer.lines[bufferPosition.row]
    const suggestions = []
    const config = this.getConfig()

    providers.forEach(provider => {
      try {
        const result = provider(config, lineText, prefix) || []
        result.forEach(suggestion => suggestions.push(suggestion))
      } catch (error) {
        console.log('Orionsoft snippets error', error)
      }
    })

    return suggestions
  }

}
