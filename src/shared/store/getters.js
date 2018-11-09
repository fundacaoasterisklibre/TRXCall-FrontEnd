import { isEmpty } from 'lodash'

export const currentUser = state => state.auth.main
export const isLogged = state => {
  if (state.auth.main === undefined) {
    return false
  }
  return !isEmpty(state.auth.main.accessToken)
}
