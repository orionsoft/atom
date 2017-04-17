'use babel'
/* global atom */

import OrionsoftView from './orionsoft-view'
import { CompositeDisposable } from 'atom'
import createReactComponent from './files/createReactComponent'
import createApolloResolver from './files/createApolloResolver'
import createApolloResolverType from './files/createApolloResolverType'
import createApolloSchema from './files/createApolloSchema'
import createReactRouterGroup from './files/createReactRouterGroup'
import createTranslationGroup from './files/createTranslationGroup'
import createCollection from './files/createCollection'
import Snippets from './Snippets'
import saveTask from './saveTask'
import login from './helpers/login'
import logout from './helpers/logout'

export default {

  orionsoftView: null,
  modalPanel: null,
  subscriptions: null,

  activate (state) {
    this.orionsoftView = new OrionsoftView(state.orionsoftViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.orionsoftView.getElement(),
      visible: false
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'orionsoft:dage': () => this.activateDage(),
      'orionsoft:save-task': saveTask,
      'orionsoft:logout': logout,
      'orionsoft:login': login,
      'orionsoft:create-react-component': createReactComponent,
      'orionsoft:create-apollo-resolver': createApolloResolver,
      'orionsoft:create-apollo-resolver-function': createApolloResolverType,
      'orionsoft:create-apollo-schema': createApolloSchema,
      'orionsoft:create-meteor-collection': createCollection,
      'orionsoft:create-react-router-group': createReactRouterGroup,
      'orionsoft:create-translation-group': createTranslationGroup
    }))
    this.completionProvider = new Snippets()
  },

  deactivate () {
    console.log('Orionsoft deactivated')
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.orionsoftView.destroy()
    delete this.completionProvider
    this.completionProvider = null
  },

  serialize () {
    return {
      orionsoftViewState: this.orionsoftView.serialize()
    }
  },

  getCompletionProvider () {
    return this.completionProvider
  },

  activateDage () {
    this.modalPanel.show()
    setTimeout(() => {
      this.modalPanel.hide()
    }, 1000)
  }

}
