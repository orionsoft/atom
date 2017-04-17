'use babel'
/* global atom */
import getItem from './getItem'

export default async function (options) {
  return await new Promise(function (resolve, reject) {
    const {container, result, submitButton, cancelButton, inputs} = getItem(options)
    const panel = atom.workspace.addBottomPanel({item: container})

    inputs[0].focus()

    const submit = function () {
      resolve(result)
      clean()
    }

    const cancel = function () {
      reject(new Error('Form cancelled'))
      clean()
    }

    const nextInput = function (submitOnLast) {
      for (var i = 0; i < inputs.length; i++) {
        const input = inputs[i]
        if (input === document.activeElement) {
          const nextInput = inputs[i + 1]
          if (nextInput) {
            return nextInput.focus()
          } else if (submitOnLast) {
            return submit()
          }
        }
      }
      inputs[0].focus()
    }

    const keyEventListener = function (event) {
      if (event.keyCode === 13) return nextInput(true)
      if (event.keyCode === 27) return cancel()
      if (event.keyCode === 9) return nextInput(false)
    }

    container.onkeydown = keyEventListener

    const clean = function () {
      panel.destroy()
    }

    submitButton.onclick = submit
    cancelButton.onclick = cancel
  })
}
