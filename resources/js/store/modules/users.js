let state = {
    users: [],
};

let getters = {
    allUsers: state => state.users,
};

let actions = {
    addUser: ({commit}, data) => {
        commit("addNewUser", data);
    },
};

let mutations = {
    addNewUser: (state, user) => {
        state.users.push(user);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};