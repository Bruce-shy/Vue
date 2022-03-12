import Vue from 'vue'
import App from './App.vue'
import sb from './components/index'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.directive('sloading', sb)
// Object.keys(directives).forEach(key => {
//   Vue.directive(key, directives[key])
// })
