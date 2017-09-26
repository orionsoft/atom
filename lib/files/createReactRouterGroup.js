'use babel'
/* global atom */

import fs from 'fs-plus'

const getReactFile = function(name) {
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

const getLayoutFile = function() {
  return `import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'

export default class Layout extends React.Component {

  static propTypes = {
    children: PropTypes.node
  }

  render () {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    )
  }

}
`
}

const getStylesFile = function() {
  return `:local(.container) {

}
`
}

const getRouterFile = function(name) {
  return `import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Loadable from 'react-loadable'
import Loading from 'App/components/RouteLoading'

const comp = loader => Loadable({loader, loading: Loading})

export default (
  <Route path="/${name.toLowerCase()}" component={comp(() => import('./Layout'))}>
    <IndexRoute component={comp(() => import('./Main'))} />
  </Route>
)
`
}

const create = function(path, name) {
  if (fs.existsSync(`${path}/${name}`)) {
    return atom.confirm({
      message: `Route component ${name} already exists`
    })
  }

  fs.writeFileSync(`${path}/${name}/Layout/index.js`, getLayoutFile())
  fs.writeFileSync(`${path}/${name}/Layout/styles.css`, getStylesFile())
  fs.writeFileSync(`${path}/${name}/Main/index.js`, getReactFile('Main'))
  fs.writeFileSync(`${path}/${name}/Main/styles.css`, getStylesFile())
  fs.writeFileSync(`${path}/${name}/index.js`, getRouterFile(name))
  atom.workspace.open(`${path}/${name}/index.js`)
}

export default function(event) {
  const path = event.currentTarget.querySelector('.selected [data-path]').getAttribute('data-path')
  const QuestionDialog = require('../dialogs/question')
  const dialog = new QuestionDialog(path, 'Enter the name of the Route Group')
  dialog.on('answer', (event, name) => {
    create(path, name)
  })
  dialog.attach()
}
