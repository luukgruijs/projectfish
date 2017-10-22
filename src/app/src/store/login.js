import Vue from "vue";
import router from "../router"


export const types = {
    LOGIN: "LOGIN",
    LOGIN_SUCCESSFULL: "LOGIN_SUCCESSFULL"
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
        name: state => user.name
    },
    mutations: {
        [types.LOGIN_SUCCESSFULL](state, payload) {
            state.name = payload.name
            state.email = payload.email
            state.role = payload.role
            state._id = payload._id
            state.token = payload.token
        }
    },
    actions: {
        login({ commit, state }, user) {
            Vue.http.post('authenticate', user)
            .then((response) => {
                commit(types.LOGIN_SUCCESSFULL, response.data);
                router.push("/home")
            })
        }
    }
}