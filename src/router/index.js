import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component:  resolve=>(require(["@/views/Home.vue"],resolve)),
    meta:{
      title: '大唛养车',
      keepAlive: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: resolve=>(require(["@/views/About.vue"],resolve)),
    meta:{
      title: '加载中',
      keepAlive: true
    }
  },
  {
    path: '/upkeep',
    name: 'Upkeep',
    component: resolve=>(require(["@/views/Upkeep.vue"],resolve)),
    meta:{
      title: '服务保养',
      keepAlive: true
    }
  },
  {
    path: '/pages',
    name: 'Pages',
    component: resolve=>(require(["@/views/Pages.vue"],resolve)),
    meta:{
      title: '产品搜索',
      keepAlive: true
    }
    
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
//动态修改页面title
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title == undefined?'大唛养车':to.meta.title
  //若路径异常则返回首页
  if(!to.name){
    next({
      path: '/',
    })
  }
  next();
})
export default router
