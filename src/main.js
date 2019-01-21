// import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import axios from 'axios'
import axiosConfig from './components/config'
// import "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import store from './vuex/store'

Vue.config.productionTip = false

// axios.defaults.baseURL = 'http://106.12.121.211:7001'
axios.defaults.baseURL = 'http://127.0.0.1:7001'

Vue.prototype.$http = axios
Vue.prototype.axiosConfig = axiosConfig

import api from './http/index'
Vue.use(api)

router.beforeEach((to, from, next) => {
  const account = window.sessionStorage.getItem('account');
  if (to.path === "/login") {
    if (account) {
      next({path: '/index'})
    } else {
      next();
    }
  } else {
    if (account) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
