import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Mask
import Maska from "maska";

// Importing bootstrap:
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

createApp(App).use(router).use(Maska).mount("#app");
