import "./registerServiceWorker"
import { createApp } from "vue"
import App from "./App.vue"
import l10n from "./l10n"
import mitt from "mitt"
import router from "./router"
import store from "./store"
import Vue3TouchEvents from "vue3-touch-events"
import VueLazyLoad from "vue3-lazyload"

window.emitter = mitt()

window.vm = createApp(App)
	.use(l10n(store.state.settings.locale))
	.use(router)
	.use(store)
	.use(Vue3TouchEvents)
	.use(VueLazyLoad, {
		delay: 250,
		observerOptions: { rootMargin: "50%", threshold: 0 },
	})
	.mount("body")
