import { createApp } from 'vue'
import mitt from 'mitt'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue3TouchEvents from 'vue3-touch-events'
import './registerServiceWorker'

window.emitter = mitt()
// Vue.use(VueLazyload)

window.vm = createApp(App)
	.use(router)
	.use(store)
	.use(Vue3TouchEvents)
	.mount('body')
