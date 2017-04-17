'use babel'
/* global fetch */
/* global atom */
import login from './login'

export default async function (query, variables) {
  const token = atom.config.get('orionsoft.userToken') || await login()
  try {
    const response = await fetch('http://api.admin.orionsoft.io/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({query, variables}),
      credentials: 'include'
    })
    const result = await response.json()

    if (result.errors) {
      result.errors.map(error => {
        console.log('GraphQL error', error)
        atom.notifications.addError(error.message)
      })
      throw new Error('graphql error')
    }
    return result.data
  } catch (error) {
    console.log('Error', error)
    atom.notifications.addError(error.message)
    throw error
  }
}
