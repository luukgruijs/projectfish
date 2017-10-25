import Vue from "vue";
import router from "../router"


export const types = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    CALCULATE_BASKET_TOTAL: "CALCULATE_BASKET_TOTAL",
    REMOVE_FROM_BASKET: "REMOVE_FROM_BASKET",
    CLEAR_BASKET: "CLEAR_BASKET"
}

export default {
    state: {
        basket: [],
        basket_total: 0,
    },
    getters: {
        basket: state => state.basket,
        basket_total: state => state.basket_total
    },
    mutations: {
        [types.ADD_TO_BASKET](state, payload) {
            const item = payload
            const basket = state.basket
            basket.push(item)

            state.basket = basket;
        },
        [types.REMOVE_FROM_BASKET](state, payload) {
            state.basket = state.basket.filter((item) => {
                return item.name !== payload.name
            })
        },
        [types.CALCULATE_BASKET_TOTAL](state) {
            let total = 0
            let basket = state.basket

            for (let item of state.basket) {
                total += item.price
            }

            state.basket_total = total;
        },
        [types.CLEAR_BASKET](state) {
            state.basket = []
            state.basket_total = 0
        }
    },
    actions: {
        sendOrder({ dispatch, commit }, order) {
            Vue.http.post('order', order)
            .then((response) => {
                commit(types.CLEAR_BASKET)

                bus.$emit("open__snackbar", "Succesfully submitted order", 5000)
            })
        },
        addTobasket({ dispatch, commit }, item) {
            commit(types.ADD_TO_BASKET, item)
            commit(types.CALCULATE_BASKET_TOTAL)
        },
        removeFromBasket({ dispatch, commit }, item) {
            commit(types.REMOVE_FROM_BASKET, item)
            commit(types.CALCULATE_BASKET_TOTAL)
        }
    }
}