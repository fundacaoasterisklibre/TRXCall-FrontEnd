import BaseDTO from './BaseDTO'

export default class TrunkRegisterTypeDTO extends BaseDTO {
  constructor (_data) {
    super()

    this._name = null
    this._description = null
    this._protocol = null

    this.merge(_data)
  }

  get data () {
    return this._data
  }

  set data (value) {
    this._data = value
  }

  get name () {
    return this._name
  }

  set name (value) {
    this._name = value
  }

  get value () {
    return this._name
  }

  set value (value) {
    this._name = value
  }

  get description () {
    return this._description
  }

  set description (value) {
    this._description = value
  }

  get protocol () {
    return this._protocol
  }

  set protocol (value) {
    this._protocol = value
  }
}
