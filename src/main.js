import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/common/scss/index.scss'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('./common/images/default.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
