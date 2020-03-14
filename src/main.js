import Vue from 'vue'
import VueBus from 'vue-bus'
import App from './components/App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
import './registerServiceWorker'
import store from './store'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(VueLazyload)
Vue.use(VueBus)
Vue.use(Vue2TouchEvents)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
