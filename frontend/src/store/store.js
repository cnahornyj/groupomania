import Vue from 'vue'
import Vuex from 'vuex'

// Store

Vue.use(Vuex)
const store = new Vuex.Store(
  {
    state:{
      token: sessionStorage.getItem('usertoken'),
      authenticated: false
    },
    mutations:{
      setAuthentication(state, status) {
        state.authenticated = status;
      }
    }
  }
)

export default store