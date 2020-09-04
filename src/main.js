import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'babel-polyfill';
import apilist from '@/api/apilist';
import iview from 'iview';
import QS from 'qs';
import 'iview/dist/styles/iview.css';
import './assets/reset.css';//初始化样式
import './assets/CSS.css'; //通用样式
import { Cascader } from 'element-ui';
Vue.prototype.$qs = QS;
Vue.prototype.$http = apilist; //添加apilist到Vue的原型对象上
Vue.config.productionTip = false;

Vue.use(iview)
Vue.use(Cascader)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
