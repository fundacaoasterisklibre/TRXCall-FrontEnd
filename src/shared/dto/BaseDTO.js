export default class BaseDTO {
  construct () {}

  merge (_data) {
    if (_data !== undefined) {
      _data = this.cast(_data)
      Object.assign(this, _data)
    }
  }

  set value (value) {
    this.clearAll()
    if (this.id === undefined) {
      return
    }
    this.id = value
  }

  get value () {
    return this._id
  }

  clearAll () {
    for (var i in this) {
      this[i] = null
    }
  }
  cast (data) {
    let aux = []
    for (var i in data) {
      i = i.replace('_', '')
      if (!this.hasOwnProperty('_' + i)) {
        continue
      }
      aux[i] = data[i]
    }
    return aux
  }

  toJSON () {
    if (this === undefined) {
      return {}
    }
    // if (this.__ob__ === undefined) {
    //   return this
    // }
    let result = {}
    for (var i in this) {
      let v = i.replace('_', '')
      if (this[v] === undefined) {
        continue
      }
      let val = this[v]
      if (this[v] instanceof BaseDTO) {
        val = this[v].toJSON()
      }
      result[v] = val
    }
    return result
  }
}
