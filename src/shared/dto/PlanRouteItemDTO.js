import BaseDTO from './BaseDTO'
import TrunkDTO from './TrunkDTO'

export default class PlanRouteItemDTO extends BaseDTO {
  constructor (_data) {
    super()

    this._id = null
    this._order = 0
    this._trunk = new TrunkDTO()
    this._groupType = null
    this.merge(_data)
  }

  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  get order () {
    return this._order
  }

  set order (value) {
    this._order = value
  }

  get trunk () {
    return this._trunk
  }

  set trunk (value) {
    this._trunk = new TrunkDTO(value)
  }

  get groupType () {
    return this._groupType
  }

  set groupType (value) {
    this._groupType = value
  }
}
