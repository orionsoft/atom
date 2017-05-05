'use babel'
/* global atom */

const getNewFile = function (fileContent, importString) {
  if (/import .+\n/g.test(fileContent)) {
    return fileContent.replace(/import .+\n\n/g, function (input) {
      return input.replace(/\n\n/g, '\n') + `${importString}\n\n`
    })
  } else {
    return `${importString}\n${fileContent}`
  }
}

export default async function (importString) {
  const editor = atom.workspace.getActiveTextEditor()
  const fileContent = editor.buffer.getText()
  if (fileContent.includes(importString)) return
  const newContent = getNewFile(fileContent, importString)

  const bufferPosition = editor.getCursors()[0].getBufferPosition()

  const newPosition = {
    row: bufferPosition.row + 1,
    column: bufferPosition.column
  }

  editor.setText(newContent)
  editor.setCursorBufferPosition(newPosition)
}
