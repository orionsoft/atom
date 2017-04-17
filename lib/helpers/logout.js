'use babel'
/* global fetch */
/* global atom */

export default async function () {
  const token = atom.config.get('orionsoft.userToken')
  const query = `mutation logout ($token: String!) {
    logout (token: $token) {
      success
    }
  }`
  const response = await fetch('http://api.admin.orionsoft.io/graphql', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({query, variables: {token}}),
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

  atom.config.set('orionsoft.userToken', null)

  atom.notifications.addSuccess('Logged out successfully')
}
