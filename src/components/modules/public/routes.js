
function load (component) {
  // '@' is aliased to src/components
  return () =>
    import(`@/modules/public/${component}.vue`)
}

const routes = [
  {
    path: '/',
    component: load('Layout'),
    redirect: {
      name: 'auth.login'
    },
    children: [
      {
        path: 'auth.login',
        name: 'auth.login',
        component: load('auth/Login'),
        meta: {
          noAuth: true
        }
      }
    ]
  }
]

export default routes
