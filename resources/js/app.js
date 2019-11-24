import Vue from "vue";
import VueCookies from "vue-cookies";

import router from "./router/";
import store from "./store/";
import vuetify from "./vuetify/";
import "./filters/";

import "./dependencies";

import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(VueCookies);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");