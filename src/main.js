import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import './assets/style/reset.scss'
import vueXlsxTable from 'vue-xlsx-table'
import VueTouch from 'vue-touch'

Vue.use(vueXlsxTable, { rABS: false })
Vue.use(VueTouch, { name: 'v-touch' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
