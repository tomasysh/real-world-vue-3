import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
import GStore from "./reactive";
import Store from './store';
import 'nprogress/nprogress.css'

createApp(App)
    .use(Store)
    .use(router)
    .provide('GStore', GStore)
    .mount("#app");
