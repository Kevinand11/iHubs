const state = {
	app: {
		name: "iHub",
		primary: "light-blue darken-2",
		secondary: "orange darken-2",
		lighter: "light-blue lighten-2",
		url: window.location.origin + "/"
	}
};

const getters = {
	appInfo: (state) => state.app
};

const actions = {};

const mutations = {};

export default {
	state,
	getters,
	actions,
	mutations
};
