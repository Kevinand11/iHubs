const state = {
	history: [],
	intended: ""
};

const getters = {
	getHistory: (state) => state.history,
	getLastRoute: (state) => {
		if (state.history.length > 0) {
			return state.history[0];
		}
		return "/";
	},
	getLastNonAuthRoute: (state) => {
		let filtered = state.history.filter((x) => {
			return !(x == "/login" || x == "/register");
		});
		if (filtered.length > 0) {
			return filtered[0];
		}
		return "/";
	},
	getPreviousNonAuthRoute: (state) => {
		let filtered = state.history.filter((x) => {
			return !(x == "/login" || x == "/register");
		});
		if (filtered.length > 1) {
			return filtered[1];
		}
		return "/";
	},
	getIntended: (state) => {
		if (state.intended !== "") {
			return state.intended;
		}
		let filtered = state.history.filter((x) => {
			return !(x == "/login" || x == "/register");
		});
		if (filtered.length > 0) {
			return filtered[0];
		}
		return "/";
	}
};

const actions = {
	appendHistory: ({ commit }, route) => {
		commit("addToHistory", route);
	},
	clearHistory: ({ commit }) => {
		commit("deleteHistory");
	},
	setIntended: ({ commit }, route) => {
		commit("makeIntended", route);
	},
	clearIntended: ({ commit }) => {
		commit("resetIntended");
	}
};

const mutations = {
	addToHistory: (state, route) => {
		state.history.unshift(route);
	},
	deleteHistory: (state) => {
		state.history = [];
	},
	makeIntended: (state, route) => {
		state.intended = route;
	},
	resetIntended: (state) => {
		state.intended = "";
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
