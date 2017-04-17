'use babel'

import getInput from './getInput'
import _ from 'underscore'

export default function (options) {
  const result = {}
  const inputs = []
  const container = document.createElement('div')
  container.className = 'project-find padded'

  const header = document.createElement('header')
  header.className = 'header'
  header.innerHTML = `<span class="header-item description">${options.title}</span>`
  container.appendChild(header)

  const keys = _.keys(options.fields)
  for (const key of keys) {
    const field = options.fields[key]
    const input = getInput(field)
    input.onChange(value => {
      result[key] = value
    })
    inputs.push(input.input)
    container.appendChild(input)
  }

  const buttonsContainer = document.createElement('div')
  buttonsContainer.className = 'orionsoft-prompt-buttons'
  container.appendChild(buttonsContainer)

  const cancelButton = document.createElement('button')
  cancelButton.className = 'btn'
  cancelButton.innerText = 'Cancel'
  buttonsContainer.appendChild(cancelButton)

  const submitButton = document.createElement('button')
  submitButton.className = 'btn'
  submitButton.innerText = 'Submit'
  buttonsContainer.appendChild(submitButton)

  return {container, result, submitButton, cancelButton, inputs}
}
