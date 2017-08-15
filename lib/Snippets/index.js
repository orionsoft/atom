'use babel'
/* global atom */
import translations from './translations'
import importSnippets from './import'
import completeImporter from './completeImporter'
import fs from 'fs-plus'
import _ from 'underscore'

const providers = [importSnippets, translations, completeImporter]

export default class Snippets {
  selector = '.source.js'
  inclusionPriority = 1
  id = 1

  constructor() {
    this.addId = _.debounce(() => this.id++, 3000)
  }

  getConfig() {
    try {
      const projectPath = atom.project.getPaths()[0]
      const content = fs.readFileSync(`${projectPath}/.orionsoftrc`).toString()
      return JSON.parse(content)
    } catch (error) {
      // console.log('Error:', error)
      return {}
    }
  }

  getLine(text, bufferPosition) {
    return text.split('\n')[bufferPosition.row]
  }

  getId() {
    this.addId()
    return this.id
  }

  onDidInsertSuggestion({editor, triggerPosition, suggestion}) {
    if (!suggestion.onDidInsertSuggestion) return
    const fileContent = editor.buffer.getText()
    const file = editor.buffer.file
    suggestion.onDidInsertSuggestion({editor, triggerPosition, suggestion, fileContent, file})
  }

  async getSuggestions({editor, bufferPosition, scopeDescriptor, prefix}) {
    const fileContent = editor.buffer.getText()
    const path = editor.buffer.file.path
    const lineText = this.getLine(fileContent, bufferPosition)
    const nextLine = this.getLine(fileContent, {...bufferPosition, row: bufferPosition.row + 1})
    const preText = lineText.substr(0, bufferPosition.column)
    const id = this.getId(editor, bufferPosition)
    const suggestions = []
    const file = editor.buffer.file
    const config = this.getConfig()

    for (const provider of providers) {
      try {
        const result =
          (await provider({
            id,
            config,
            path,
            file,
            lineText,
            preText,
            editor,
            bufferPosition,
            scopeDescriptor,
            prefix,
            fileContent,
            nextLine
          })) || []
        result.forEach(suggestion => suggestions.push(suggestion))
      } catch (error) {
        console.log('Orionsoft snippets error', error)
      }
    }

    return suggestions
  }
}
