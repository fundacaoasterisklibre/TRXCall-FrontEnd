import BaseDTO from './BaseDTO'
import ForwardDTO from './ForwardDTO'

export default class IncomingDTO extends BaseDTO {
  constructor (_data) {
    super()

    this._id = null
    this._name = null
    this._from = null
    this._to = new ForwardDTO()
    this.merge(_data)
  }

  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  get name () {
    return this._name
  }

  set name (value) {
    this._name = value
  }

  get from () {
    return this._from
  }

  set from (value) {
    this._from = value
  }

  get to () {
    return this._to
  }

  set to (value) {
    this._to = new ForwardDTO(value)
  }
}
