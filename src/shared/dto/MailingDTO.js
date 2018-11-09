import BaseDTO from './BaseDTO'

export default class MailingDTO extends BaseDTO {
  constructor (_data) {
    super()

    this._id = null
    this._description = null

    this.merge(_data)
  }

  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  get description () {
    return this._description
  }

  set description (value) {
    this._description = value
  }
}
