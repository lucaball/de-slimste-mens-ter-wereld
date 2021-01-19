import { App, plugin } from '@inertiajs/inertia-vue'
import Vue from 'vue'

import VueSocketIO from 'vue-socket.io';
Vue.use(new VueSocketIO({
  connection: '/games',
}))

Vue.config.productionTip = false
Vue.use(plugin)

const el = document.getElementById('app')

new Vue({
  el: '#app',
  render: h => h(App, {
    props: {
      initialPage: JSON.parse(el.dataset.page),
      resolveComponent: name => require(`./Pages/${name}`).default,
    },
  }),
});
