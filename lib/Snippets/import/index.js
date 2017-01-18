'use babel'

export default function ({id, config, lineText, prefix}) {
  const regex = /^import .* from '(.*)'/gi
  const match = regex.exec(lineText)
  if (!match || !match[1]) return
  const parts = match[1].split('/')
  const last = parts[parts.length - 1]
  const remove = last.replace(/^[A-z]+/, '')
  const final = last.replace(remove, '')

  return [{
    snippet: final,
    displayText: final,
    type: 'value',
    description: `Import ${final}`
  }]
}
