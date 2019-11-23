import Vue from "vue";
import Vuex from "vuex";

import appInfo from "./modules/appInfo";
import auth from "./modules/auth";
import history from "./modules/history";
import routes from "./modules/routes";
import users from "./modules/users";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		appInfo,
		auth,
		history,
		routes,
		users
	}
});
