import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import * as actions from './actions'
import * as getters from './getters'
import modules from './modules'

Vue.use(Vuex)
const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export default new Vuex.Store(
  {
    actions,
    getters,
    modules,
    strict: process.env.NODE_ENV !== 'production',
    plugins: [vuexLocalStorage.plugin]
  }
)
