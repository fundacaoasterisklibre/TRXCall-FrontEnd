import BaseDTO from './BaseDTO'

export default class DepartmentDTO extends BaseDTO {
  constructor (_data) {
    super()

    this._id = null
    this._name = null

    this.merge(_data)
  }

  get data () {
    return this._data
  }

  set data (value) {
    this._data = value
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
}
