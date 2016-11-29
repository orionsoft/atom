path = require 'path'
fs = require 'fs-plus'
Dialog = require './dialog'
{repoForPath} = require './helpers'

module.exports =
class QuestionDialog extends Dialog
  constructor: (initialPath, question) ->
    super
      prompt: question
      initialPath: ''
      select: false
      iconClass: 'icon-file-add'

  onConfirm: (response) ->
    @close()
    @trigger 'answer', [response]
