import BaseDTO from './BaseDTO'

export default class GroupDialplanDTO extends BaseDTO {
  constructor (_data) {
    super()

    this._label = null
    this._value = null
    this._trunks = []
    this._items = []
    this._select = {
      'trunk': []
    }

    this.merge(_data)
    this._data = _data
  }

  get data () {
    return this._data
  }

  set data (value) {
    this._data = value
  }

  get label () {
    return this._label
  }

  set label (value) {
    this._label = value
  }

  get value () {
    return this._value
  }

  set value (value) {
    this._value = value
  }

  get trunks () {
    return this._trunks
  }

  set trunks (value) {
    this._trunks = value
  }

  get items () {
    return this._items
  }

  set items (value) {
    this._items = value
  }

  get select () {
    return this._select
  }

  set select (value) {
    this._select = value
  }
}
