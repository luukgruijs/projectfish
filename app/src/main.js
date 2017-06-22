import Vue from "vue"

// router
import router from './router'

// resources
import Vue from './resources'

// permissions
import Vue from "./directives/permissions"

// filters
import Vue from "./filters"

// main component
import app from "./components/app"

// init event bus
window.bus = new Vue();

new Vue({
    el: "#app",
    created: function() {
        window.Vue = this
    },
    router,
    render: h => h(app)
})