import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import hoverCSS from 'hover.css';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/css/main.css'
// import { ValidationProvider } from 'vee-validate';

import * as VueGoogleMaps from 'vue2-google-maps'

// Vue.component('ValidationProvider', ValidationProvider);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR-API-KEY',
    libraries: 'places',
  },

})
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
