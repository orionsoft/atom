'use babel'

export default function ({id, config, lineText, preText, prefix, fileContent}) {
  if (!/ {2}@au/g.test(preText)) return
  return [{
    snippet: '  @autobind',
    displayText: '@autobind',
    type: 'snippet',
    description: 'Adds autobind to a function and imports the package',
    replacementPrefix: preText,
    onDidInsertSuggestion: function ({fileContent, editor}) {
      if (/import autobind from 'autobind-decorator'/.test(fileContent)) return
      const newContent = fileContent.replace(/import .+\n\n/g, function (input) {
        return input.replace(/\n\n/g, '\n') + `import autobind from 'autobind-decorator'\n\n`
      })

      editor.setText(newContent)
    }
  }]
}
