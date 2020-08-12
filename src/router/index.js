import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: resolve=>(require(["@/views/About.vue"],resolve))
  },
  {
    path: '/upkeep',
    name: 'Upkeep',
    component: resolve=>(require(["@/views/Upkeep.vue"],resolve))
  },
  {
    path: '/pages',
    name: 'Pages',
    component: resolve=>(require(["@/views/Pages.vue"],resolve))
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
