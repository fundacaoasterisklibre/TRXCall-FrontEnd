import Vue from 'vue'

class HttpService {
  constructor (_connectionName) {
    let connectionName = _connectionName === undefined ? 'default' : _connectionName
    let clientId = process.env.MY_APP_CRED.client_id
    let secretId = process.env.MY_APP_CRED.client_secret

    this._http = Vue.http
    this._accessToken = null
    this._refreshToken = null
    this._credentials = {client_id: clientId, client_secret: secretId}
    localStorage.setItem(connectionName + '_base_url', connectionName)

    Object.freeze(this)
  }

  auth (username, password) {
    // let creds = {
    //   'username': username,
    //   'password': password
    // }

    // let credsString = JSON.stringify(creds)
    let loginURI = this.baseURL + 'v1/authentication/login'
    let obj = {'apikey': ''} // GibberishAES.enc(credsString, this.credentials.client_id)}
    let newObj = Vue._.defaults(obj, this.credentials)

    return this._http.post(loginURI, newObj).then((response) => {
      this.setCredential(response.data.access_token, response.data.refresh_token)
      return response.data
    })
  }

  logout () {
    this.setCredential(null, null)
  }

  setCredential (_accessToken, _refreshToken) {
    this.accessToken = _accessToken
    this.refreshToken = _refreshToken
    localStorage.setItem(this.storage + '_access_token', _accessToken)
    localStorage.setItem(this.storage + '_refresh_token', _refreshToken)

    this._http.headers.common['Authorization'] = 'Bearer ' + _accessToken
  }

  validateToken (obj) {
    let validateURI = this.baseURL + '/v1/authentication/validate'
    return this._http.post(validateURI, obj).then((response) => {
      return response.data
    })
  }

  refreshToken () {
    let refreshTokenURI = this.baseURL + '/v1/authentication/refresh'
    let obj = {
      'client_id': this.credentials.client_id,
      'client_secret': this.credentials.client_secret,
      'refresh_token': this.refreshToken
    }

    return this._http.post(refreshTokenURI, obj).then((response) => {
      this.setCredential(response.data.access_token, response.data.refresh_token)
      return response.data
    })
  }

  isAuth () {
    return (this.accessToken || this.refreshToken)
  }
}

export default HttpService
