import "./registerServiceWorker"
import { createApp } from "vue"
import App from "./App.vue"
import mitt from "mitt"
import router from "./router"
import store from "./store"
import Vue3TouchEvents from "vue3-touch-events"
import VueLazyLoad from "vue3-lazyload"

window.emitter = mitt()

window.vm = createApp(App)
	.use(router)
	.use(store)
	.use(Vue3TouchEvents)
	.use(VueLazyLoad, {
		delay: 250,
		observerOptions: { rootMargin: "50%", threshold: 0 },
	})
	.mount("body")
