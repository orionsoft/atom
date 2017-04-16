'use babel'
/* global fetch */
/* global atom */
import prompt from '../prompt'

export default async function () {
  const variables = await prompt({
    title: 'Orionsoft Account Login',
    fields: {
      email: {
        placeholder: 'Orionsoft admin account email',
        type: 'text'
      },
      password: {
        placeholder: 'Account password',
        type: 'password'
      }
    }
  })
  const query = `mutation login ($email: String, $password: String) {
    loginWithPassword (email: $email, plainPassword: $password) {
      token
    }
  }`
  const response = await fetch('http://api.admin.orionsoft.io/graphql', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({query, variables}),
    credentials: 'include'
  })
  const result = await response.json()

  if (result.errors) {
    result.errors.map(error => {
      console.log(error)
      atom.notifications.addError(error.message)
    })
    throw new Error('graphql error')
  }

  atom.config.set('orionsoft.userToken', result.data.loginWithPassword.token)

  atom.notifications.addSuccess('Logged in successfully')

  return result.data.loginWithPassword.token
}
