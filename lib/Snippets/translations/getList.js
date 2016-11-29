'use babel'

import fs from 'fs'
import getTrFileKeys from './getTrFileKeys'

const searchPath = async function (path, files, base, allKeys) {
  for (const file of fs.readdirSync(path)) {
    const subpath = path + '/' + file
    if (fs.lstatSync(subpath).isDirectory()) {
      await searchPath(subpath, files, base, allKeys)
    } else if (file.endsWith('en.js')) {
      const keys = await getTrFileKeys(`${path}/${file}`, `${base}/`)
      keys.forEach(key => {
        allKeys.push(key)
      })
      files.push(`${path}/${file}`)
    }
  }
}

let list = []
let lastId = null

export default async function (paths, id) {
  if (lastId === id && list.length > 0) return list
  lastId = id
  list = []
  for (const path of paths) {
    await searchPath(path, [], path, list)
  }
  return list
}
