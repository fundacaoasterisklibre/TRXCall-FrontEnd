import Base from './BaseDTO'

export default class Refresh extends Base {
  constructor (_data) {
    super()
    this._clientId = 'development'
    this._secretId = 'development'
    this._refreshToken = null
    this.merge(_data)
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

  get refreshToken () {
    return this._refreshToken
  }

  set refreshToken (value) {
    this._refreshToken = value
  }
}
