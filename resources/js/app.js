import Vue from "vue";

import router from "./router/";
import store from "./store/";
import lang from './lang/';
import "./filters/";

import "./dependencies";

import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    lang,
    render: h => h(App)
}).$mount("#app");