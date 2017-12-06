import Vue from "vue";
import router from "../router"


export const types = {
    SET_USERS: "SET_USERS",
    SET_USER_EDITMODE: "SET_USER_EDITMODE",
    SET_SELECTED_USER: "SET_SELECTED_USER",
}

export default {
    state: {
        users: [],
        user_edit_mode: false,
        selected_user: {},
    },
    getters: {
        users: state => state.users,
        user_edit_mode: state => state.user_edit_mode,
        selected_user: state => state.selected_user,
    },
    mutations: {
        [types.SET_USERS](state, payload) {
            state.users = payload
        },
        [types.SET_USER_EDITMODE](state, payload) {
            state.user_edit_mode = payload
        },
        [types.SET_SELECTED_USER](state, payload) {
            state.selected_user = payload
            state.user_edit_mode = true
        },
    },
    actions: {
        getUsers({ dispatch, commit }) {
            Vue.http.get('users')
            .then((response) => {
                commit(types.SET_USERS, response.body);
            })
        },
        createUser({ dispatch, commit }, item) {
            Vue.http.post("users", item).then((response) => {
                bus.$emit("open__snackbar", `succesfully created ${response.body.name}`, 5000)
                dispatch("getUsers")
                commit(types.SET_USER_EDITMODE, false)
            })
        },
        updateUser({ dispatch, commit }, payload) {
            Vue.http.post(`users/${payload.id}`, payload.user).then((response) => {
                bus.$emit("open__snackbar", `succesfully updated ${payload.user.name}`, 5000)

                dispatch("getUsers")
                commit(types.SET_USER_EDITMODE, false)
            })
        },
        deleteUser({ dispatch, commit }, userId) {
            Vue.http.delete(`users/${userId}`).then((response) => {
                dispatch("getUsers")
            })
        }
    }
}