'use babel'
import promptDialog from '../helpers/promptDialog'
import speakeasy from 'speakeasy'
/* global atom */

export default async function () {
  const lastSecret = atom.config.get('orionsoft.lastSecret') || 'Enter two factor'
  const secret = await promptDialog('Two factor code', lastSecret.substr(0, 10) + '...') || lastSecret
  atom.config.set('orionsoft.lastSecret', secret)

  const token = speakeasy.totp({ secret, encoding: 'base32' })
  atom.notifications.addSuccess(token)
}
