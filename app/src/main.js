import Vue from "vue"

// router
import router from './router'

// resources
import { Vue as resources } from './resources'

// store
import store from './store';

// permissions
import { Vue as permissions } from "./directives/permissions"

// filters
import { Vue as filters }  from "./filters"

// main component
import app from "./components/app"

// init event bus
window.bus = new Vue();

new Vue({
    el: "#app",
    created: function() {
        window.Vue = this
    },
    store,
    router,
    render: h => h(app)
})