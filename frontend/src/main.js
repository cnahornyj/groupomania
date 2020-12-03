import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'


// Utilisation des fontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faImages, faTrash, faPaperPlane, faHeart, faPen, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash, faImages, faPaperPlane, faHeart, faPen, faEllipsisH)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Utilisation de Vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)


Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
