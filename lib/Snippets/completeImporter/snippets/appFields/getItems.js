'use babel'
import fs from 'fs-plus'

export default function(file) {
  const basePath = file.path.replace(/App\/.*$/, 'App/components/fields')
  const paths = fs.listSync(basePath)
  const collectionNames = paths
    .map(path => path.replace(/.*\//, '').replace('.js', ''))
    .filter(name => name[0] === name[0].toUpperCase())
  return collectionNames
}
