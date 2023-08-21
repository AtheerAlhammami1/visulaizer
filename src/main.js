import VueGoogleMaps from '@fawmi/vue-google-maps'
import axios from 'axios'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import App from './App.vue'
import './assets/main.css'
import router from './router'
// Install Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Prime Vue
import Column from 'primevue/column'
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import Row from 'primevue/row'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCIog63DvS6W2p-fhSWYFzNvDvqYFvUBPg'
  }
})
app.provide('axios', app.config.globalProperties.axios)
app.component('font-awesome-icon', FontAwesomeIcon)
library.add(faUserSecret)

// Prime Vue
app.use(PrimeVue)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Row', Row)

app.mount('#app')
