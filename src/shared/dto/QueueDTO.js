import BaseDTO from './BaseDTO'
import QueueMemberDTO from './QueueMemberDTO'
import QueueStrategyTypeDTO from './QueueStrategyTypeDTO'

export default class QueueDTO extends BaseDTO {
  constructor (_data) {
    super()

    this._id = null
    this._name = null
    this._strategy = new QueueStrategyTypeDTO()
    this._members = []

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

  get members () {
    return this._members
  }

  set members (value) {
    let _this = this
    value.forEach((data) => {
      _this.addItems(data)
    })
  }

  addItems (value) {
    let planRouteItem = (value instanceof QueueMemberDTO) ? value : new QueueMemberDTO(value)
    this._members.push(planRouteItem)
  }

  get strategy () {
    return this._strategy
  }

  set strategy (value) {
    this._strategy = new QueueStrategyTypeDTO(value)
  }
}
