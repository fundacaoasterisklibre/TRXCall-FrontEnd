import _BaseService from './_BaseService'

export default class LoginService extends _BaseService {
  constructor (_resource) {
    super(_resource, 'auth')
  }

  login (_auth) {
    return this._resource
      .save({
        action: 'login',
        'XDEBUG_SESSION_START': 12654
      }, _auth)
      .then((res) => res.body)
  }

  refreshToken (model) {
    return this._resource
      .save({
        action: 'refresh',
        'XDEBUG_SESSION_START': 12654
      }, model)
      .then((res) => res.body)
  }
}
