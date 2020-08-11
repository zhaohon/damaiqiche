import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios' //引入axios
import css from './assets/CSS.css' //引入axios

Vue.prototype.$axios = axios; //添加axios到Vue的原型对象上


Vue.config.productionTip = false

new Vue({
  css,
  router,
  render: h => h(App)
}).$mount('#app')
