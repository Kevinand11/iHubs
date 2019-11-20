window.$ = window.jQuery = require("jquery");
window._ = window.lodash = require("lodash");

require("bootstrap");
require("@fortawesome/fontawesome-free");

import Vue from "vue";
import { Form, HasError } from "vform";
import VueProgressBar from "vue-progressbar";
import swal from "sweetalert2";

Vue.use(VueProgressBar,{
    color: "rgb(150,255,200)",
    failedColor: "rgb(255,0,0)",
    height: "5px",
});

Vue.component(HasError.name, HasError);

window.Form = Form;
window.Fire = new Vue();

window.swal = swal;
window.toast = swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000
});

window.axios = require("axios");
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
let token = document.head.querySelector("meta[name='csrf-token']");
if (token) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
}
Vue.prototype.$http = window.axios;
