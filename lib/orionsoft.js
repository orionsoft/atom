'use babel'
/* global atom */

import OrionsoftView from './orionsoft-view'
import { CompositeDisposable } from 'atom'

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
      'orionsoft:dage': () => this.activateDage()
    }))
  },

  deactivate () {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.orionsoftView.destroy()
  },

  serialize () {
    return {
      orionsoftViewState: this.orionsoftView.serialize()
    }
  },

  activateDage () {
    this.modalPanel.show()
    setTimeout(() => {
      this.modalPanel.hide()
    }, 1000)
  }

}
