import BaseDTO from './BaseDTO'
import ForwardDTO from './ForwardDTO'

export default class IvrOptionsDTO extends BaseDTO {
  constructor (_data) {
    super()
    this._option = null
    this._goto = new ForwardDTO()
    this.merge(_data)
  }

  get option () {
    return this._option
  }

  set option (value) {
    this._option = value
  }

  get goto () {
    return this._goto
  }

  set goto (value) {
    this._goto = new ForwardDTO(value)
  }
}
