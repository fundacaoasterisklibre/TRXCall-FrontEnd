import { routes as modules } from '@/modules/routes'

function load (component) {
  return () =>
    import(`@/${component}.vue`)
}

export default [
  ...modules,
  {
    path: '*',
    component: load('pages/Error404')
  }
]
