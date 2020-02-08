import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
import './registerServiceWorker'
import store from './store'

Vue.use(VueLazyload)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
