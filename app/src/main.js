import Vue from 'vue'
import app from './App.vue'

Vue.config.debug = process.env.NODE_ENV !== 'production'

const App = new Vue({
  el: 'body',
  components: {
    app
  }
})
