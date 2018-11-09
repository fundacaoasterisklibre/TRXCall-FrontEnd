import Base from './BaseDTO'

export default class Auth extends Base {
  constructor (_data) {
    super()
    this._username = null
    this._secret = null
    this._clientId = 'development'
    this._secretId = 'development'
    this._accessToken = null
    this._refreshToken = null
    this.merge(_data)
  }

  get username () {
    return this._username
  }

  set username (value) {
    this._username = value
  }

  get secret () {
    return this._secret
  }

  set secret (value) {
    this._secret = value
  }

  get clientId () {
    return this._clientId
  }

  set clientId (value) {
    this._clientId = value
  }

  get secretId () {
    return this._secretId
  }

  set secretId (value) {
    this._secretId = value
  }

  get accessToken () {
    return this._accessToken
  }

  set accessToken (value) {
    this._accessToken = value
  }

  get refreshToken () {
    return this._refreshToken
  }

  set refreshToken (value) {
    this._refreshToken = value
  }
}
