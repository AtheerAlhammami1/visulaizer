import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import axios from 'axios';
import VueAxios from 'vue-axios'
const app = createApp(App)

app.use(createPinia())
app.use(router);
app.use(VueAxios, axios);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDjWa3GrFd2X5htH4dC_VW_RHZKHLfNvUs',
    },
});
app.provide("axios", app.config.globalProperties.axios);
app.mount('#app')
