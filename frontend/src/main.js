import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import moment from 'moment'


// Utilisation des fontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faImages, faTrash, faPaperPlane, faHeart, faPen, faEllipsisH, faTimes, faComments } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash, faImages, faPaperPlane, faHeart, faPen, faEllipsisH, faTimes, faComments)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Utilisation de Vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
