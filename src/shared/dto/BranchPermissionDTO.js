import BaseDTO from './BaseDTO'

export default class BranchPermissionDTO extends BaseDTO {
  constructor (_data) {
    super()
    this._id = null
    this._groupType = null
    this._groupTypeLabel = null
    this._permit = false
    this.merge(_data)
    this._data = _data
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

  get groupType () {
    return this._groupType
  }

  set groupType (value) {
    this._groupType = value
  }

  get groupTypeLabel () {
    return this._groupTypeLabel
  }

  set groupTypeLabel (value) {
    this._groupTypeLabel = value
  }

  get permit () {
    return this._permit
  }

  set permit (value) {
    this._permit = value
  }
}
