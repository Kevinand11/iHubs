import Vue from "vue";
import VueI18n from "vue-i18n";
import FlagIcons from "vue-flag-icon";

import us from "./trans/us";

let languages = {
	us
};

Vue.use(VueI18n);
Vue.use(FlagIcons);

export default new VueI18n({
	locale: "us",
	fallbackLocale: "us",
	languages
});
