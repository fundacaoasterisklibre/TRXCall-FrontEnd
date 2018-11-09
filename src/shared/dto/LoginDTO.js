import Base from './BaseDTO'

export default class Auth extends Base {
  constructor (_data) {
    super()
    this._username = null
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
