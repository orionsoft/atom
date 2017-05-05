'use babel'

export default async function (question, placeholder) {
  const QuestionDialog = require('../dialogs/question')
  const dialog = new QuestionDialog('hola hola', question, placeholder)
  return new Promise(function (resolve) {
    dialog.on('answer', (event, name) => {
      resolve(name)
    })
    dialog.attach()
  })
}
