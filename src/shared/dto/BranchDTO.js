import BaseDTO from './BaseDTO'
import SipDTO from './SipDTO'
import UserDTO from './UserDTO'
import ForwardDTO from './ForwardDTO'
import PlanRouteDTO from './PlanRouteDTO'
import BranchPermissionDTO from './BranchPermissionDTO'

export default class BranchDTO extends BaseDTO {
  constructor (_data) {
    super()

    this._id = null
    this._name = null
    this._user = new UserDTO()
    this._sip = new SipDTO({type: 'friend'})
    this._alwaysIn = new ForwardDTO()
    this._alwaysOut = new ForwardDTO()
    this._busyIn = new ForwardDTO()
    this._busyOut = new ForwardDTO()
    this._planRoute = new PlanRouteDTO()
    this._permissions = []
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

  get user () {
    return this._user
  }

  set user (value) {
    this._user = new UserDTO(value)
  }

  get userID () {
    return this._user.id
  }

  set userID (value) {
    this._user = new UserDTO({id: value})
  }

  get sip () {
    return this._sip
  }

  set sip (value) {
    this._sip = new SipDTO(value)
  }

  get alwaysIn () {
    return this._alwaysIn
  }

  set alwaysIn (value) {
    this._alwaysIn = new ForwardDTO(value)
  }

  get alwaysOut () {
    return this._alwaysOut
  }

  set alwaysOut (value) {
    this._alwaysOut = new ForwardDTO(value)
  }

  get busyIn () {
    return this._busyIn
  }

  set busyIn (value) {
    this._busyIn = new ForwardDTO(value)
  }

  get busyOut () {
    return this._busyOut
  }

  set busyOut (value) {
    this._busyOut = new ForwardDTO(value)
  }

  get planRoute () {
    return this._planRoute
  }

  set planRoute (value) {
    this._planRoute = new PlanRouteDTO(value)
  }

  get permissions () {
    return this._permissions
  }

  set permissions (value) {
    let _this = this
    value.forEach((data) => {
      _this.addPermissions(data)
    })
  }

  clearAllPermissions () {
    this._permissions = []
  }

  addPermissions (value) {
    let branchPermission = (value instanceof BranchPermissionDTO) ? value : new BranchPermissionDTO(value)
    this._permissions.push(branchPermission)
  }
}
