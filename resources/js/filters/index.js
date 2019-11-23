import Vue from "vue";
import VuexStore from "../store";

Vue.filter("roles", (role) => {
	return role == 0 ? "User" : "Admin";
});
Vue.filter("appendURL", function(picture) {
	let url = VuexStore.getters.appInfo.url;
	return url + picture;
});
