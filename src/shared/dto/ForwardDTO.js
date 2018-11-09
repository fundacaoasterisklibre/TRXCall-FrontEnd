import BaseDTO from './BaseDTO'

export default class ForwardDTO extends BaseDTO {
  constructor (_data) {
    super()
    this._classname = null
    this._reference = null
    this._value = null
    this._description = null
    this.merge(_data)
  }

  get classname () {
    return this._classname
  }

  set classname (value) {
    this._classname = value
  }

  get reference () {
    return this._reference
  }

  set reference (value) {
    this._reference = value
  }

  set value (value) {
    if (value === null) {
      this.classname = null
      this.reference = null
      return
    }

    let data = value.split('_')
    this.classname = data[0]
    this.reference = data[1]
  }

  get value () {
    return this._classname + '_' + this._reference
  }

  get description () {
    return this._description
  }

  set description (value) {
    this._description = value
  }
}
