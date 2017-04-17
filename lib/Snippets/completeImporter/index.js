'use babel'

import snippets from './snippets'

export default function (options) {
  return snippets.map(snippet => snippet(options)).filter(snippet => !!snippet)
}
