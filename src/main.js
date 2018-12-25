import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import axios from 'axios'
import axiosConfig from './components/config'
import "element-ui"
import "element-ui/lib/theme-chalk/index.css"

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:7001'

Vue.prototype.$http = axios
Vue.prototype.axiosConfig = axiosConfig

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
  render: h => h(App),
}).$mount('#app')
