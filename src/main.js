import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import Datepicker from 'vuejs-datepicker'
import validationLocaleEs from '../node_modules/vee-validate/dist/locale/es'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/scss/font-awesome.scss'

import moment from 'moment'
moment.locale('es')

Vue.use(BootstrapVue)

VeeValidate.Validator.addLocale(validationLocaleEs)
Vue.use(VeeValidate, {locale: 'es'})
VeeValidate.Validator.setLocale('es')

Vue.config.productionTip = false
Vue.filter('moment', function (value, begin, end) {
  return moment(value).format('D \\d\\e MMMM \\d\\e\\l YYYY')
})

Vue.component('datepicker', Datepicker)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App, Datepicker }
})
