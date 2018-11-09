import BaseDTO from './BaseDTO'

export default class KhompDTO extends BaseDTO {
  constructor (_data) {
    super()
    this._id = null
    this._groupId = null
    this.merge(_data)
    this._data = _data
  }

  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  get groupId () {
    return this._groupId
  }

  set groupId (value) {
    this._groupId = value
  }
}
