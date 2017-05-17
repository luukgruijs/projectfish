import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

const routes = [
    {
        path: "/",
        name: "dashboard",
        component: function (resolve) {
            require(['@/components/dashboard/dashboard.vue'], resolve)
        },
    },
    {
        path: "/ordernow",
        name: "ordernow",
        component: function (resolve) {
            require(['@/components/order_now.vue'], resolve)
        },
    },
    {
        path: "/manage/items",
        name: "items",
        component: function (resolve) {
            require(['@/components/manage/items.vue'], resolve)
        },
    },
    {
        path: "/manage/orders",
        name: "orders",
        component: function (resolve) {
            require(['@/components/manage/orders.vue'], resolve)
        },
    },
    {
        path: "/manage/users",
        name: "users",
        component: function (resolve) {
            require(['@/components/manage/users.vue'], resolve)
        },
    },
]

const router = new Router({routes})


export default router