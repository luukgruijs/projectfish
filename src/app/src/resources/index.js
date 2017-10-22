import Vue from "vue"
import VueResource from "vue-resource"

Vue.use(VueResource)

// Set root url for api calls
Vue.http.options.root = 'http://localhost:8002/v1';

// set http interceptors
Vue.http.interceptors.push(function(request, next) {
    // modify headers
    if (JSON.parse(window.sessionStorage.getItem("user"))) {
        request.headers.set("x-access-token", JSON.parse(window.sessionStorage.getItem("user")).token);
    }

    // continue to next interceptor
    next(function(response) {
        if (response.status !== 200) {
            bus.$emit("open__snackbar", response.body.message, 5000)
        }

        if (response.status === 401) {
            window.location = "/"
        }
    });
});

export default Vue