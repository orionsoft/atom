'use babel'

const forRN = function(name) {
  return `import React from 'react'
import {Text, View} from 'react-native'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'

export default class ${name} extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View>
        <Text>${name}</Text>
        <Switch>
          <Route path="" component={null} />
        </Switch>
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
import {Route, Switch} from 'react-router-dom'

export default class ${name} extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        ${name}
        <Switch>
          <Route path="" component={null} />
        </Switch>
      </div>
    )
  }
}
`
}
