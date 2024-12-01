import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from  "axios";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import ShowdownPlugin from "../plugins/showdown";
const app = createApp(App)
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.mount('#app')
app.use(ShowdownPlugin);

app.config.globalProperties.$axios = axios
window.axios = axios











