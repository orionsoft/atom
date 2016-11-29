'use babel'

/* global atom */
import fs from 'fs-plus'

export default function (path) {
  const dir = atom.packages.getLoadedPackage('orionsoft').path
  return fs.readFileSync(`${dir}/lib/files/${path}`).toString()
}
