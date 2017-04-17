'use babel'

import snippets from './snippets'
import _ from 'underscore'

export default function (options) {
  return _.flatten(snippets.map(snippet => snippet(options)).filter(snippet => !!snippet))
}
