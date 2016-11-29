import Vue from 'vue'
import store from './store.js';
import App from './App'

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App },
  
})
