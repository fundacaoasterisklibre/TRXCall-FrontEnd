import BaseDTO from './BaseDTO'
import PlanRouteItemDTO from './PlanRouteItemDTO'

export default class PlanRouteDTO extends BaseDTO {
  constructor (_data) {
    super()

    this._id = null
    this._name = null
    this._items = []
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

  get items () {
    return this._items
  }

  set items (value) {
    let _this = this
    value.forEach((data) => {
      _this.addItems(data)
    })
  }

  clearAllItems () {
    this._items = []
  }

  addItems (value) {
    let planRouteItem = (value instanceof PlanRouteItemDTO) ? value : new PlanRouteItemDTO(value)
    this._items.push(planRouteItem)
  }
}
