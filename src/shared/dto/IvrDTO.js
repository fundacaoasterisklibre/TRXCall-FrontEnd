import BaseDTO from './BaseDTO'
import IvrOptionsDTO from './IvrOptionsDTO'

export default class IvrDTO extends BaseDTO {
  constructor (_data) {
    super()
    this._id = null
    this._name = null
    this._maxTry = 0 // Maximo de tentativa
    this._timeout = 5 // Tempo de digito
    this._audioWelcome = null // Audio quando inicia
    this._audioWelcomeChanged = null
    this._audioRead = 'beep' // Audio para digitar, do loop
    this._audioReadChanged = null
    this._dialBranchPermit = false
    this._options = []
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

  get maxTry () {
    return this._maxTry
  }

  set maxTry (value) {
    this._maxTry = value
  }

  get timeout () {
    return this._timeout
  }

  set timeout (value) {
    this._timeout = value
  }

  get audioWelcome () {
    return this._audioWelcome
  }

  set audioWelcome (value) {
    this._audioWelcome = value
  }

  get audioWelcomeChanged () {
    return this._audioWelcomeChanged
  }

  set audioWelcomeChanged (value) {
    this._audioWelcomeChanged = value
  }

  get audioRead () {
    return this._audioRead
  }

  set audioRead (value) {
    this._audioRead = value
  }

  get audioReadChanged () {
    return this._audioReadChanged
  }

  set audioReadChanged (value) {
    this._audioReadChanged = value
  }

  get dialBranchPermit () {
    return this._dialBranchPermit
  }

  set dialBranchPermit (value) {
    this._dialBranchPermit = value
  }

  get options () {
    return this._options
  }

  set options (value) {
    let _this = this
    value.forEach((data) => {
      _this.addOption(data)
    })
  }

  addOption (value) {
    let options = (value instanceof IvrOptionsDTO) ? value : new IvrOptionsDTO(value)
    this._options.push(options)
  }
}
