'use babel'

export default function (options) {
  const container = document.createElement('section')
  container.className = 'input-block find-container'

  const input = document.createElement('input')
  container.input = input
  container.appendChild(input)

  if (options.type === 'text' || options.type === 'password') {
    input.className = 'prompt-input'
    input.type = options.type
    input.placeholder = options.placeholder
    input.onkeydown = function (event) {
      if (event.keyCode === 8) {
        input.value = event.target.value.slice(0, -1)
        input.oninput(event)
      }
    }
    container.onChange = function (callback) {
      if (options.initialValue) {
        input.value = options.initialValue
        callback(options.initialValue)
      }
      input.oninput = function (event) {
        callback(event.target.value)
      }
    }
    return container
  } else if (options.type === 'options') {
    input.className = 'prompt-input'
    input.type = 'text'
    const optionsText = options.options.map((option, index) => `${index + 1}: ${option.label}`).join(', ')
    input.placeholder = `${options.placeholder} (${optionsText}${options.allowOthers ? ', 0: other' : ''})`
    let editing = false
    container.onChange = function (callback) {
      if (options.initialValue) {
        input.value = options.initialValue
        callback(options.initialValue)
      }
      const setInputValue = function (value) {
        setTimeout(() => {
          input.value = value
        }, 0)
      }
      input.onkeydown = function (event) {
        if (event.keyCode === 8) {
          if (editing) {
            const newValue = event.target.value.slice(0, -1)
            input.value = newValue
            callback(newValue)
            return
          } else {
            setInputValue('')
            callback(null)
            return
          }
        }
        if (editing) return true
        if (event.keyCode === 48 && options.allowOthers) {
          setInputValue('')
          editing = true
          input.placeholder = options.placeholder
          return false
        }
        if (event.keyCode > 48 && event.keyCode < 58) {
          const number = event.keyCode - 48
          for (var i = 1; i <= options.options.length; i++) {
            if (i === number) {
              const option = options.options[i - 1]
              setInputValue(option.label)
              callback(option.value)
              return false
            }
          }
        }
        setInputValue(event.target.value)
        return false
      }
      input.oninput = function (event) {
        if (editing) {
          return callback(event.target.value)
        }
      }
    }
    return container
  }
}
