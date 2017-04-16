'use babel'
/* global fetch */
/* global atom */
import login from './login'

export default async function (query, variables) {
  const token = atom.config.get('orionsoft.userToken') || await login()
  const response = await fetch('http://api.admin.orionsoft.io/graphql', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Autorization': token
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

  return result.data
}
