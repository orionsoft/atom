'use babel'

import readFile from 'fs-readfile-promise'

export default async function (path, base) {
  const buffer = await readFile(path)
  const content = buffer.toString()
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
