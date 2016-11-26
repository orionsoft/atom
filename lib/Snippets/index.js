'use babel'
/* global atom */
import translations from './translations'
import fs from 'fs-plus'
import _ from 'underscore'

const providers = [translations]

export default class Snippets {
  selector = '.source.js, .source.graphql'
  inclusionPriority = 1
  id = 1

  constructor () {
    this.addId = _.debounce(() => this.id++, 3000)
  }

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

  getLine (editor, bufferPosition) {
    return editor.buffer.lines[bufferPosition.row]
  }

  getId () {
    this.addId()
    return this.id
  }

  async getSuggestions ({editor, bufferPosition, scopeDescriptor, prefix}) {
    const lineText = this.getLine(editor, bufferPosition)
    const id = this.getId(editor, bufferPosition)
    const suggestions = []
    const fileContent = editor.buffer.lines.join('\n')
    const file = editor.buffer.file
    const config = this.getConfig()

    for (const provider of providers) {
      try {
        const result = await provider({
          id,
          config,
          file,
          lineText,
          editor,
          bufferPosition,
          scopeDescriptor,
          prefix,
          fileContent
        }) || []
        result.forEach(suggestion => suggestions.push(suggestion))
      } catch (error) {
        console.log('Orionsoft snippets error', error)
      }
    }

    return suggestions
  }

}
