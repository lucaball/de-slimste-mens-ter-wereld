import { App, plugin } from '@inertiajs/inertia-vue'
import Vue from 'vue'

import VueSocketIO from 'vue-socket.io';
import VuePeerJS from 'vue-peerjs';
import Peer from 'peerjs';

// Vue.use(VuePeerJS, new Peer({}));
Vue.use(new VueSocketIO({
  connection: 'https://9270775bcbc6.ngrok.io/games',
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
