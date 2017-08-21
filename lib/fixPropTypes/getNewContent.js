'use babel'

import importFile from '../Snippets/completeImporter/importFile'

export default function(fileContent) {
  if (!fileContent.includes('PropTypes.')) return fileContent

  let newContent = fileContent.replace(/React\.PropTypes\./g, 'PropTypes.')

  if (!/import PropTypes from 'prop-types'/.test(newContent)) {
    newContent = importFile(newContent, `import PropTypes from 'prop-types'`)
  }

  return newContent
}
