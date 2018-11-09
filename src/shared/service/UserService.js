import _BaseService from './_BaseService'

export default class UserService extends _BaseService {
  constructor (_resource) {
    super(_resource, 'account')
  }

  changePassword (_data) {
    return this._resource
      .save({
        action: 'password',
        'XDEBUG_SESSION_START': 12654
      }, _data)
      .then((res) => res.body)
  }
}
