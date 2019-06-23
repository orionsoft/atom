'use babel'

const forRN = function(name) {
  return `import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'

export default function ${name}(props) {
  return (
    <View style={styles.container}>
      <Text>${name}</Text>
    </View>
  )
}
`
}

export default function(name, isRN) {
  if (isRN) return forRN(name)
  return `import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'

const propTypes = {

}

function ${name}(props) {
  return (
    <div className={styles.container}>
      ${name}
    </div>
  )
}

${name}.propTypes = propTypes

export default ${name}
`
}
