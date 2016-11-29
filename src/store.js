import Vue from 'vue';
import Vuex from 'vuex';
import firebaseApp from './plugins/firebaseApp.js'

Vue.use(Vuex);
Vue.use(firebaseApp);

export default new Vuex.Store({
  state: {
    currentUser: {},
    db: {},
    auth: {},
    provider: {},
    autentificado: false,
    usuarioActivo: null
  },
  mutations: {
    setfirebaseDB: function(state,firebaseApp){
      state.db = firebaseApp;
    },
    setfirebaseAuth: function(state,firebaseApp){
      state.auth = firebaseApp;
    },
    setfirebaseProviderG: function(state,firebaseApp){
      state.provider = firebaseApp;
    },
    setUsuarioActivo: function(state, user){
      if(user!=null){
        state.autentificado=true;
      }else{
        state.autentificado=false;
      }

    }
  }
})