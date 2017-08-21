'use babel'

import fs from 'fs-plus'
/* global atom */
global.fs = fs

var getFiles = function(path, files = []) {
  fs.readdirSync(path).map(function(file) {
    var subpath = path + '/' + file
    if (fs.lstatSync(subpath).isDirectory()) {
      getFiles(subpath, files)
    } else {
      files.push(path + '/' + file)
    }
  })
  return files
}

export default function() {
  const paths = atom.workspace.project.rootDirectories.map(directory => directory.path)
  const files = []
  for (const path of paths) {
    for (const file of getFiles(path)) {
      if (file.includes('/node_modules/')) continue
      if (!file.includes('/src/')) continue
      if (!file.endsWith('.js')) continue
      files.push(file)
    }
  }
  return files
}
