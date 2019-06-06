import Vue from 'vue'
import { Button } from 'element-ui'
import App from './App'
import store from './store'

Vue.component(Button.name, Button)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
