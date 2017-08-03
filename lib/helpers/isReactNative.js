'use babel'

/* global atom */
import findFirstFileInParent from './findFirstFileInParent'

export default function (path) {
  try {
    const json = findFirstFileInParent('package.json', path)
    const config = JSON.parse(json)
    return !!config.dependencies['react-native']
  } catch (error) {
    console.log(error)
    atom.notifications.addError(error.message)
    // console.log('Error:', error)
    return false
  }
}
