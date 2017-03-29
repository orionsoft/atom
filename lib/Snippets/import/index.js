'use babel'

export default function ({id, config, lineText, preText, prefix}) {
  const regex = /^import .* from '(.*)'/gi
  const match = regex.exec(lineText)
  if (!match || !match[1]) return
  const parts = match[1].split('/')
  const last = parts[parts.length - 1]
  const remove = last.replace(/^[A-z]+/, '')
  const final = last.replace(remove, '')
  const line = lineText.replace('import  from', `import ${final} from`)

  if (/^import .* from '(.*)'/gi.test(preText)) {
    return [{
      snippet: line,
      displayText: final,
      type: 'snippet',
      description: `Import ${final}`,
      replacementPrefix: lineText
    }]
  } else {
    return [{
      snippet: final,
      displayText: final,
      type: 'snippet',
      description: `Import ${final}`
    }]
  }
}
