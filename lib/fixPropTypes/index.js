'use babel'
/* global atom */
import getNewContent from './getNewContent'
import getAllFiles from './getAllFiles'
import fs from 'fs-plus'

export default function() {
  const editor = atom.workspace.getActiveTextEditor()
  if (editor) {
    const fileContent = editor.buffer.getText()
    editor.setText(getNewContent(fileContent))
  } else {
    const files = getAllFiles()
    for (const file of files) {
      const content = fs.readFileSync(file).toString()
      const newContent = getNewContent(content)
      fs.writeFileSync(file, newContent)
    }
  }
}
