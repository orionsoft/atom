'use babel'

import fs from 'fs-plus'

export default function (path, base) {
  const content = fs.readFileSync(path).toString()
  const lines = content
  .replace(/(.|\n)*export default /g, '')
  .replace(/({|})/g, '')
  .split('\n')

  return lines.map(line => {
    const prefix = path.replace(base, '').replace('en.js', '').replace(/\//g, '.')
    const parts = line.split(':')
    const name = (parts[0] || '').trim()
    const text = (parts[1] || '').replace(/(,|')/g, '').trim()
    return {
      key: prefix + name,
      text
    }
  })
  .filter(key => {
    return !!key.text
  })
}
