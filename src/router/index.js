import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component:Home,
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
  mode: 'hash',
  routes
})
// const router = new VueRouter({
//   hashbang:false,//去除#！开头
//   transitionOnload:false,//初次加载的时候是否对<router-view>处理场景切换效果
//   history:true,//是否开启html5模式，去掉锚点
//   saveScrollPosition:false, //记住页面的滚动位置 html5模式适用,
//   root:'/dist',//路由生效的基础路径
//   routes
// });
//动态修改页面title
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title == undefined?'大唛养车':to.meta.title
  //若路径异常则返回首页
  console.log('to',to)
  if(!to.name){
    next({
      path: '/',
    })
  }
  next();
})
export default router
