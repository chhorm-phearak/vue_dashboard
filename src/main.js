import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { registerNaiveUI } from "./plugins/naiveui";
import router from "./router/index.js";
// Import the main store within store/index.js
import store from "./store";

const app = createApp(App);
app.use(registerNaiveUI());
app.use(router);
app.use(store);
app.mount("#app");
