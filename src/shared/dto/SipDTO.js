import BaseDTO from './BaseDTO'

export default class SipDTO extends BaseDTO {
  constructor (_data) {
    super()
    this._id = null
    this._defaultuser = null
    this._secret = null
    this._host = undefined
    this._nat = false
    this._type = null
    this._callLimit = 0
    this.merge(_data)
    this._data = _data
  }

  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  get defaultuser () {
    return this._defaultuser
  }

  set defaultuser (value) {
    this._defaultuser = value
  }

  get secret () {
    return this._secret
  }

  set secret (value) {
    this._secret = value
  }

  get host () {
    return this._host
  }

  set host (value) {
    this._host = value
  }

  get nat () {
    return this._nat
  }

  set nat (value) {
    this._nat = value
  }

  get callLimit () {
    return this._callLimit
  }

  set callLimit (value) {
    this._callLimit = value
  }

  get type () {
    return this._type
  }

  set type (value) {
    this._type = value
  }
}
