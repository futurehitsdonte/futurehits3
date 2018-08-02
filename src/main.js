import '@babel/polyfill'
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)
Vue.use(VueAnalytics, {
  id: 'UA-123164138-1',
  router
})



Vue.config.productionTip = false
export const eventBus = new Vue();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
