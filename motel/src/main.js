import { createApp } from "vue";
import App from "./App.vue";

import router from "./router"

require("@/assets/phuc.css")
require("@/assets/bootstrap.css")
require("@/assets/modal.scss")

const app = createApp(App);
app.use(router);
app.mount("#app");
