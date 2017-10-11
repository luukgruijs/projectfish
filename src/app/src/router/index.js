import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

const routes = [
    {
        path: "/home",
        name: "dashboard",
        component: function (resolve) {
            require(['@/components/dashboard.vue'], resolve)
        },
    },
    {
        path: "/",
        name: "login",
        component: function (resolve) {
            require(['@/components/login.vue'], resolve)
        },
    },
    {
        path: "/set-password",
        name: "set_password",
        component: function (resolve) {
            require(['@/components/set_password.vue'], resolve)
        },
    },
    {
        path: "/forgot-password",
        name: "forgot_password",
        component: function (resolve) {
            require(['@/components/forgot_password.vue'], resolve)
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
            require(['@/components/items.vue'], resolve)
        },
    },
    {
        path: "/manage/orders",
        name: "orders",
        component: function (resolve) {
            require(['@/components/orders.vue'], resolve)
        },
    },
    {
        path: "/manage/orders/:id",
        name: "order",
        component: function (resolve) {
            require(['@/components/order.vue'], resolve)
        },
    },
    {
        path: "/manage/users",
        name: "users",
        component: function (resolve) {
            require(['@/components/users.vue'], resolve)
        },
    },
    {
        path: "/manage/settings",
        name: "settings",
        component: function (resolve) {
            require(['@/components/settings.vue'], resolve)
        },
    },
]

const router = new Router({routes})


export default router