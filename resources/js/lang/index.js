import Vue from "vue";
import VueI18n from "vue-i18n";

import us from "./trans/us";

let languages = {
	us,
};

Vue.use(VueI18n);

export default new VueI18n({
	locale:'us',
	fallbackLocale:'us',
	languages
})
