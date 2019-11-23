const state = {
    auth: {},
    token:"",
    loggedIn: false,
    admin: false
};

const getters = {
    getAuth: state => state.auth,
    getToken: state => state.token,
    isLoggedIn: state => state.auth.name !== '',
    isAdmin: state => state.auth.role === 'admin',
	getRoles: state => state.roles,
};

const actions = {
    setAuth({commit}, {user, remember}){
        if(remember){
            this._vm.$cookies.set("user",user,"0");
        }
        commit("authorized", user);
    },
    setToken({commit}, {token, remember}){
        window.axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        if(remember){
            this._vm.$cookies.set("oauth",token,"0");
        }
        commit("oauth", token);
    },
    logout({commit}){
        this._vm.$cookies.remove("oauth");
        this._vm.$cookies.remove("user");
        commit("clearAuth");
    }
};

const mutations = {
    authorized: (state, user) => {
        state.auth = user;
    },
    oauth: (state, token) => {
        state.token = token;
    },
    clearAuth: (state) => {
        state.auth = {};
        state.token = '';
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
