import { createApp } from 'vue'
import mitt from 'mitt'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue3TouchEvents from 'vue3-touch-events'
import VueLazyLoad from 'vue3-lazyload'
import l10n from './l10n'
import './registerServiceWorker'

window.emitter = mitt()

window.vm = createApp(App)
	.use(router)
	.use(store)
	.use(Vue3TouchEvents)
	.use(VueLazyLoad)
	.use(l10n(store.state.locale))
	.mount('body')
