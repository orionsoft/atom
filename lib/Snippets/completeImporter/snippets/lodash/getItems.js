'use babel'
import fs from 'fs-plus'

export default function(file) {
  const basePath = file.path.replace(/src\/.*$/, 'node_modules/lodash')
  const paths = fs.listSync(basePath)
  const names = paths.filter(fileName => fileName.endsWith('.js')).map(path => {
    return {
      // docs: fs.readFileSync(path).toString(),
      name: path.replace(/.*\//, '').replace('.js', '')
    }
  })
  return names
}
