import Vue from "vue";
import router from "../router"


export const types = {
    SET_ITEMS: "SET_ITEMS",
    SET_ITEM_EDITMODE: "SET_ITEM_EDITMODE",
    SET_SELECTED_ITEM: "SET_SELECTED_ITEM",
}

export default {
    state: {
        items: [],
        edit_mode: false,
        selected_item: {},
    },
    getters: {
        items: state => state.items,
        edit_mode: state => state.edit_mode,
        selected_item: state => state.selected_item,
    },
    mutations: {
        [types.SET_ITEMS](state, payload) {
            state.items = payload
        },
        [types.SET_ITEM_EDITMODE](state, payload) {
            state.edit_mode = payload
        },
        [types.SET_SELECTED_ITEM](state, payload) {
            state.selected_item = payload
            state.edit_mode = true
        },
    },
    actions: {
        getItems({ dispatch, commit }) {
            Vue.http.get('items')
            .then((response) => {
                commit(types.SET_ITEMS, response.body);
            })
        },
        createItem({ dispatch, commit }, item) {
            Vue.http.post("items", item).then((response) => {
                bus.$emit("open__snackbar", `succesfully updated ${item.name}`, 5000)

                dispatch("getItems")
                commit(types.SET_ITEM_EDITMODE, false)
            })
        },
        updateItem({ dispatch, commit }, payload) {
            Vue.http.post(`items/${payload.id}`, payload.item).then((response) => {
                bus.$emit("open__snackbar", `succesfully updated ${payload.item.name}`, 5000)

                dispatch("getItems")
                commit(types.SET_ITEM_EDITMODE, false)
            })
        },
        deleteItem({ dispatch, commit }, itemId) {
            Vue.http.delete(`items/${itemId}`).then((response) => {
                dispatch("getItems")
            })
        }
    }
}