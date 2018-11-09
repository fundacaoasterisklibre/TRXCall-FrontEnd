import * as Type from '../mutations-type'
import LoginDTO from '../../dto/LoginDTO'

const state = {
  main: new LoginDTO()
}

const mutations = {
  [Type.SET_USER] (state, user) {
    state.main = user
  }
}

export default {
  state,
  mutations
}
