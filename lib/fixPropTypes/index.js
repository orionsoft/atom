'use babel'
/* global atom */
import importFile from '../Snippets/completeImporter/importFile'

export default function () {
  const editor = atom.workspace.getActiveTextEditor()
  const fileContent = editor.buffer.getText()

  let newContent = fileContent.replace(/React\.PropTypes\./g, 'PropTypes.')

  if (!/import PropTypes from 'prop-types'/.test(newContent)) {
    newContent = importFile(newContent, `import PropTypes from 'prop-types'`)
  }

  editor.setText(newContent)
}
