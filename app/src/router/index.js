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
        path: "/manage/items",
        name: "items",
        component: function (resolve) {
            require(['@/components/manage/items.vue'], resolve)
        },
    },
]

const router = new Router({routes})


export default router