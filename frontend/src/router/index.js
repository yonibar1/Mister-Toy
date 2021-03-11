import Vue from 'vue'
import VueRouter from 'vue-router'
import toyApp from '../views/toy-app.vue'
import about from '../views/about.vue'
import dashboard from '../views/dashboard.vue'
import toyEdit from '../views/toy-edit.vue'
import toyDetails from '../views/toy-details.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'toyApp',
    component: toyApp
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/toy/:id?',
    name: 'toyEdit',
    component: toyEdit
  },
  {
    path: '/toy/details/:id',
    name: 'toyDetails',
    component: toyDetails
  },

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
