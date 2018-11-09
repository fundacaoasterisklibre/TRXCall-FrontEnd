import BaseDTO from './BaseDTO'
import BranchDTO from './BranchDTO'

export default class QueueMemberDTO extends BaseDTO {
  constructor (_data) {
    super()

    this._id = null
    this._branch = new BranchDTO()
    this._penalty = 1
    this._paused = false

    this.merge(_data)
  }

  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  get branch () {
    return this._branch
  }

  set branch (value) {
    this._branch = new BranchDTO(value)
  }

  get penalty () {
    return this._penalty
  }

  set penalty (value) {
    this._penalty = value
  }

  get paused () {
    return this._paused
  }

  set paused (value) {
    this._paused = value
  }
}
