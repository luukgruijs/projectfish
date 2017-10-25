import Vue from "vue";
import router from "../router"


export const types = {
    SET_SETTING: "SET_SETTING",
    SET_SETTING_EDITMODE: "SET_SETTING_EDITMODE",
}

export default {
    state: {
        setting: {},
        setting_edit_mode: false,
    },
    getters: {
        setting: state => state.setting,
        setting_edit_mode: state => state.setting_edit_mode,
    },
    mutations: {
        [types.SET_SETTING](state, payload) {
            state.setting = payload
        },
        [types.SET_SETTING_EDITMODE](state, payload) {
            state.setting_edit_mode = payload
        },
    },
    actions: {
        getSetting({ dispatch, commit }) {
            Vue.http.get('settings')
            .then((response) => {
                const setting = response.body[0]
                commit(types.SET_SETTING, setting);
            })
        },
        updateSetting({ dispatch, commit }, payload) {
            Vue.http.post(`settings/${payload.id}`, payload.setting).then((response) => {
                bus.$emit("open__snackbar", `succesfully updated settings`, 5000)

                dispatch("getSetting")
                commit(types.SET_SETTING_EDITMODE, false)
            })
        },
    }
}