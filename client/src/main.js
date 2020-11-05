import { App, plugin } from '@inertiajs/inertia-vue'
import Vue from 'vue'

Vue.config.productionTip = false
Vue.use(plugin)

const el = document.getElementById('app')

new Vue({
  render: h => h(App, {
    props: {
      initialPage: JSON.parse(el.dataset.page),
      resolveComponent: name => require(`./Pages/${name}`).default,
    },
  }),
}).$mount(el)
