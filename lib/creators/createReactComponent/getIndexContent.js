'use babel'

const forRN = function(name) {
  return `import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'

export default class ${name} extends React.Component {
  static propTypes = {
  }
  render () {
    return (
      <View style={styles.container}>
        <Text>${name}</Text>
      </View>
    )
  }
}
`
}

export default function(name, isRN) {
  if (isRN) return forRN(name)
  return `import React from 'react'
import styles from './styles.css'
export default class ${name} extends React.Component {
  static propTypes = {
  }
  render () {
    return (
      <div className={styles.container}>
        ${name}
      </div>
    )
  }
}
`
}
