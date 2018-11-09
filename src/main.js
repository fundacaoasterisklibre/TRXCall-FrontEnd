import Vue from 'vue'
import VueResource from 'vue-resource'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueI18n from 'vue-i18n'
import store from './shared/store'

// import vuexI18n from 'vuex-i18n'
import App from './App'
import router from './shared/router'
import VueTheMask from 'vue-the-mask'
import Vuelidate from 'vuelidate'
import VueLodash from 'vue-lodash/dist/vue-lodash.min'
import lodash from 'lodash'
// import { sync } from 'vuex-router-sync'
import ptBrLocale from 'element-ui/lib/locale/lang/pt-br'
import ElementLocale from 'element-ui/lib/locale'

import HttpService from './shared/service/HttpService'
import LoginService from './shared/service/LoginService'
import Refresh from './shared/dto/Refresh'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueTheMask)
Vue.use(Vuelidate)
Vue.use(VueLodash, lodash)
Vue.use(VueI18n)
Vue.use(Element)
// I18N
// Vue.use(vuexI18n.plugin, store)
// Vue.i18n.set('pt-BR')

Vue.http.interceptors.push(
  (request, next) => {
    if (!store.getters.isLogged) {
      return
    }
    request.headers.set('Authorization', 'Bearer ' + store.getters.currentUser.accessToken)
    next(
      (response) => {
        return checkExpiredToken(response, request)
      }
    )
  }
)

function checkExpiredToken (response, request) {
  return new Promise(
    (resolve, reject) => {
      if (response.status === 200) {
        resolve(response)
        return
      }
      if (response.data.message === 'Access token expired!') {
        refreshToken(request)
          .then((response) => {
            resolve(response)
          })
        return
      }
      if (response.status === 401) {
        router.push({name: 'auth.login'})
        resolve(response)
        return
      }
      resolve(response)
    }
  )
}

function refreshToken (request) {
  return new Promise(
    (resolve, reject) => {
      let loginService = new LoginService(Vue.resource)
      let refresh = new Refresh({})
      refresh.refreshToken = store.getters.currentUser.refreshToken
      let model = refresh.toJSON()
      loginService.refreshToken(model)
        .then((data) => {
          data.username = store.getters.currentUser.username
          store.dispatch('attemptLogin', {data})
            .then(() => {
              Vue.http(request)
                .then((response) => {
                  resolve(response)
                })
            })
        })
    }
  )
}

const CLIENT_ID = process.env.MY_APP_CRED.client_id
const CLIENT_SECRET = process.env.MY_APP_CRED.client_secret
const URL_SERVICE = process.env.URL_SERVICE
window.httpService = {
  default: new HttpService(URL_SERVICE, CLIENT_ID, CLIENT_SECRET)
}

if (PROD && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  console.log(window.location.host)
  Vue.http.options.root = 'http://' + window.location.hostname + ':8081/api'
}
else {
  Vue.http.options.root = URL_SERVICE
}

const messages = {
  'pt-br': {
    ...ptBrLocale
  }
}

const i18n = new VueI18n({
  locale: 'pt-br', // set locale
  messages // set locale messages
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

new Vue({
  router,
  store,
  render: h => h(App),
  template: '<App/>'
}).$mount('#app')
