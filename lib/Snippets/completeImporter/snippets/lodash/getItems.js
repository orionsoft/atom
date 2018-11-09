'use babel'
/* global atom */
import fs from 'fs-plus'

export default function(file) {
  const rootPath = atom.project.rootDirectories[0].path

  const basePath = rootPath + '/node_modules/lodash'
  const paths = fs.listSync(basePath)
  const names = paths
    .filter(fileName => fileName.endsWith('.js'))
    .map(path => {
      return {
        // docs: fs.readFileSync(path).toString(),
        name: path.replace(/.*\//, '').replace('.js', '')
      }
    })
    .filter(({name}) => !name.startsWith('_') && !name.includes(['lodash']))
  return names
}
