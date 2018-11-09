import BaseDTO from './BaseDTO'
import SipDTO from './SipDTO'
import TrunkRegisterTypeDTO from './TrunkRegisterTypeDTO'
import KhompDTO from './KhompDTO'

export default class TrunkDTO extends BaseDTO {
  constructor (_data) {
    super()

    this._id = null
    this._name = null
    this._protocol = null
    this._registerType = new TrunkRegisterTypeDTO()
    this._dialType = null
    this._ddi = null
    this._operatorCode = null
    this._ddd = null
    this._dialPrefix = null
    this._dialSufix = null

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

  get protocol () {
    return this._protocol
  }

  set protocol (value) {
    switch (this._registerType.protocol) {
      case 'SIP':
        this._protocol = new SipDTO(value)
        return
      case 'KHOMP':
        this._protocol = new KhompDTO(value)
        return
    }

    this._protocol = null
  }

  get registerType () {
    return this._registerType
  }

  set registerType (value) {
    this._registerType = new TrunkRegisterTypeDTO(value)

    if (this.registerType.protocol === 'SIP' && this.protocol instanceof SipDTO === false) {
      this.protocol = new SipDTO({type: 'peer'})
    }
    if (this.registerType.protocol === 'KHOMP' && this.protocol instanceof TrunkDTO === false) {
      this.protocol = new TrunkDTO()
    }
  }

  get dialType () {
    return this._dialType
  }

  set dialType (value) {
    this._dialType = value
  }

  get ddi () {
    return this._ddi
  }

  set ddi (value) {
    this._ddi = value
  }

  get ddd () {
    return this._ddd
  }

  set ddd (value) {
    this._ddd = value
  }

  get dialPrefix () {
    return this._dialPrefix
  }

  set dialPrefix (value) {
    this._dialPrefix = value
  }

  get dialSufix () {
    return this._dialSufix
  }

  set dialSufix (value) {
    this._dialSufix = value
  }

  get operatorCode () {
    return this._operatorCode
  }

  set operatorCode (value) {
    this._operatorCode = value
  }
}
