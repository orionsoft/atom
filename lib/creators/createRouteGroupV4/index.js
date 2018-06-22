'use babel'
import makeCreator from '../makeCreator'
import getIndexContent from './getIndexContent'
import getStylesContent from './getStylesContent'

export default makeCreator(function({path, name, createFile, openFile, isReactNative}) {
  const indexContent = getIndexContent(name, isReactNative)
  createFile(`${name}/index.js`, indexContent)

  const stylesContent = getStylesContent(name, isReactNative)
  createFile(isReactNative ? `${name}/styles.js` : `${name}/styles.css`, stylesContent)

  openFile(`${name}/index.js`)
})
