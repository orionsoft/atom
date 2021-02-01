'use babel'
import fs from 'fs-plus'

export default function (file) {
  const basePath = file.path.replace(/src\/.*$/, 'node_modules/@justodev/parts/lib/components')
  const paths = fs.listSync(basePath)

  const collectionNames = paths
    .map(path => path.replace(/.*\//, '').replace('.js', ''))
    .filter(name => name[0] === name[0].toUpperCase())
  return collectionNames
}
