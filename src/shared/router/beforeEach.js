import store from '../store'

const isLogged = () => store.getters.isLogged

export default (to, from, next) => {
  if (to.matched.some(record => record.meta.noAuth) || isLogged()) {
    next()
    return
  }

  next({
    path: '/auth.login',
    query: {redirect: to.fullPath}
  })
}
