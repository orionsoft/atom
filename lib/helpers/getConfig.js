'use babel'

/* global atom */
import fs from 'fs-plus'

export default function () {
  try {
    const projectPath = atom.project.getPaths()[0]
    const content = fs.readFileSync(`${projectPath}/.orionsoftrc`).toString()
    return JSON.parse(content)
  } catch (error) {
    // console.log('Error:', error)
    return {}
  }
}
