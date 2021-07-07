import { createApp } from 'vue'
import mitt from 'mitt'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

window.emitter = mitt()
// Vue.use(VueLazyload)
// Vue.use(Vue2TouchEvents)

window.vm = createApp(App)
	.use(router)
	.use(store)
	.mount('#app')
