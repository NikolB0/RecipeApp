import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Croppa from 'vue-croppa'; // import nove komponente
import 'vue-croppa/dist/vue-croppa.css';


Vue.use(Croppa); // koristit ćemo ju posvuda bez posebnog importa

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
