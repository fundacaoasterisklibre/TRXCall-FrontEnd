import BaseDTO from './BaseDTO'

export default class QueueStrategyTypeDTO extends BaseDTO {
  constructor (_data) {
    super()

    this._value = null
    this._label = null

    this.merge(_data)
  }

  get value () {
    return this._value
  }

  set value (value) {
    this._value = value
  }

  get label () {
    return this._label
  }

  set label (value) {
    this._label = value
  }
}
