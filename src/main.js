import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import CountryFlag from 'vue-country-flag'
import 'bootstrap-icons/font/bootstrap-icons.css'

Vue.component('country-flag', CountryFlag)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
