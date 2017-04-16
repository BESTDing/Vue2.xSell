// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import goods from './components/goods/goods.vue';
import seller from './components/seller/seller.vue';
import ratings from './components/ratings/ratings.vue';
import 'common/stylus/index.styl';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

// let app = Vue.extend(App)

Vue.use(VueRouter);
// let app = Vue.extend(App)
const routes = [
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
];

let router = new VueRouter({routes});

/* eslint-disable no-new */

const app = new Vue({
  router,
  template: '<App/>',
  components: {App}
}).$mount('#app');

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })
