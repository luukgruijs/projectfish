import Vue from "vue";
import router from "../router"


export const types = {
    SET_CURRENTUSER: "SET_CURRENTUSER"
}

export default {
    state: {
        name: '',
        email: '',
        role: '',
        _id: '',
        token: ''
    },
    getters: {
        current_user: state => state,
    },
    mutations: {
        [types.SET_CURRENTUSER](state, payload) {
            state.name = payload.name
            state.email = payload.email
            state.role = payload.role
            state._id = payload._id
            state.token = payload.token
        },
    },
    actions: {
        login({ commit, state }, user) {
            Vue.http.post('authenticate', user)
            .then((response) => {
                commit(types.SET_CURRENTUSER, response.data);
                window.sessionStorage.setItem("user", JSON.stringify(response.data))
                router.push("/home")
            })
        },
        setPassword({commit, state}, new_password) {
            Vue.http.post(`users/${new_password.user}/set_password`, new_password).then((response) => {
                bus.$emit("open__snackbar", response.body.message, 5000)
                router.push("/home")
            })
        }
    }
}