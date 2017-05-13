import Vue from "vue"

// router
import router from './router'

// main component
import app from "./components/app"

new Vue({
    el: "#app",
    created: function() {
        window.Vue = this
    },
    router,
    render: h => h(app)
})