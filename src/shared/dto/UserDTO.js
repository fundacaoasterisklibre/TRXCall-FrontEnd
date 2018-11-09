import BaseDTO from './BaseDTO'
import DepartmentDTO from './DepartmentDTO'
import UserAccessProfileDTO from './UserAccessProfileDTO'

export default class UserDTO extends BaseDTO {
  constructor (_data) {
    super()
    this._id = null
    this._name = null
    this._username = null
    this._password = null
    this._department = new DepartmentDTO()
    this._accessProfile = new UserAccessProfileDTO()
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

  get username () {
    return this._username
  }

  set username (value) {
    this._username = value
  }

  get secret () {
    return this._secret
  }

  set secret (value) {
    this._secret = value
  }

  get department () {
    return this._department
  }

  set department (value) {
    this._department = new DepartmentDTO(value)
  }

  get accessProfile () {
    return this._accessProfile
  }

  set accessProfile (value) {
    this._accessProfile = new UserAccessProfileDTO(value)
  }
}
