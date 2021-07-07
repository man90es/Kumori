import Vue, { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// Vue.use(VueLazyload)
// Vue.use(VueBus)
// Vue.use(Vue2TouchEvents)

window.vm = createApp(App)
	.use(router)
	.use(store)
	.mount('#app')
