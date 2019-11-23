const apiBase = "http://api.ihubs.herokuapp.com/";

let state = {
	users: {
		index: `${apiBase}users?page=`,
		create: `${apiBase}users`,
	},
	posts: {
		index: `${apiBase}posts?page=`,
		create: `${apiBase}posts`,
	},
	auth: {
		login: `${apiBase}login`,
		register: `${apiBase}register`,
		profile: `${apiBase}profile`,
	}
};

let getters = {
	usersRoutes: (state) => state.users,
	postsRoutes: (state) => state.posts,
	authRoutes: (state) => state.auth
};

let actions = {};

let mutations = {};

export default {
	state,
	getters,
	actions,
	mutations
};
