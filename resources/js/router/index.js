import Vue from "vue";
import Router from "vue-router";

import routes from "./routes";

import Store from "../store/index";

Vue.use(Router);

let router = new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

function isAuth() {
	let cookies = Store._vm.$cookies;
	return cookies.isKey("user") && cookies.isKey("oauth");
}
function isAdmin() {
	let cookies = Store._vm.$cookies;
	return cookies.isKey("user") && cookies.get("user").role === 1;
}

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		if (isAuth()) {
			next();
		} else {
			Store.dispatch("setIntended", to.path);
			new toast({ type: "error", title: "Login to proceed" });
			next("/login");
		}
	} else {
		if (to.meta.isAuthRoute) {
			if (isAuth()) {
				new toast({ type: "warning", title: "User already logged in" });
				next(Store.getters.getLastNonAuthRoute);
			} else {
				next();
			}
		} else {
			next();
		}
	}
});

router.afterEach((route) => {
	Store.dispatch("appendHistory", route.path);
});

export default router;
