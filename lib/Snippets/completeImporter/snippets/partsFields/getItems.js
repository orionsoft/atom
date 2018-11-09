'use babel'
import fs from 'fs-plus'

export default function(file) {
  const basePath = file.path.replace(
    /src\/.*$/,
    'node_modules/orionsoft-parts/lib/components/fields'
  )
  const paths = fs.listSync(basePath)
  const collectionNames = paths.map(path => path.replace(/.*\//, '').replace('.js', ''))
  return collectionNames
}
