import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./middleware/router";
import { initApp } from "./middleware/firebase";

initApp();

const app = createApp(App);
app.use(router);
app.mount("#app");
// createApp(App).mount('#app')
