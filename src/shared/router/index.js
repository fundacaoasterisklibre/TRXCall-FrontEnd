import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import beforeEach from './beforeEach.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [...routes]
})

router.beforeEach(beforeEach)
export default router
