import "./registerServiceWorker"
import "vue-toast-notification/dist/theme-default.css"
import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import mitt from "mitt"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import router from "./router"
import store from "./store"
import ToastPlugin from "vue-toast-notification"
import Vue3TouchEvents from "vue3-touch-events"

declare global {
	interface Window {
		emitter: any
		vm: any
	}
}

window.emitter = mitt()

const pinia = createPinia().use(piniaPluginPersistedstate)

window.vm = createApp(App)
	.use(pinia)
	.use(router)
	.use(store)
	.use(ToastPlugin)
	.use(Vue3TouchEvents)
	.mount("body")
