'use babel'
/* global atom */
import call from './call'
import prompt from '../prompt'

const generateToken = async function () {
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
  const result = await call(`mutation login ($email: String, $password: String) {
    loginWithPassword (email: $email, plainPassword: $password) {
      token
    }
  }`, variables)
  console.log(result)
}

export default function () {
  const token = atom.config.get('orionsoft.userToken')
  if (!token) return generateToken()
}
