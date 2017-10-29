import Vue from "vue";
import router from "../router"


export const types = {
    SET_ORDERS: "SET_ORDERS",
    SET_SELECTED_ORDER: "SET_SELECTED_ORDER",
}

export default {
    state: {
        orders: [],
        selected_order: {},
    },
    getters: {
        orders: state => state.orders,
        selected_order: state => state.selected_order,
    },
    mutations: {
        [types.SET_ORDERS](state, payload) {
            state.orders = payload
        },
        [types.SET_SELECTED_ORDER](state, payload) {
            state.selected_order = payload
        },
    },
    actions: {
        getOrders({ dispatch, commit }) {
            Vue.http.get('lunchorders?_populate=orders')
            .then((response) => {
                const orders = response.body.map((order) => {
                    return {
                        "amount": order.orders.reduce((amount, order) => {
                            return amount + order.amount
                        }, 0),
                        "created_at": order.created_at,
                        "orders": order.orders.length,
                        "_id": order._id
                    }
                })
                commit(types.SET_ORDERS, orders);
            })
        },
        getOrder({ dispatch, commit }, orderId) {
            Vue.http.get(`lunchorders/${orderId}?_populate=orders`)
            .then((response) => {
                commit(types.SET_SELECTED_ORDER, response.body);
            })
        },
    }
}