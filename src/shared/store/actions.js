import * as Type from './mutations-type'

export const attemptLogin = (context, payload) => {
  context.commit(Type.SET_USER, payload.data)
}
