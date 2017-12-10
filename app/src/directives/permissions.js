import Vue from "vue"

const permissions = {
    "admin": 100,
    "user": 10
}

Vue.directive("permissions", {
    bind: (el, binding, vnode) => {

        // get current user role
        let role = JSON.parse(window.sessionStorage.getItem("user")).role

        // get scores based on roles
        let required_score = permissions[binding.arg]
        let role_score = permissions[role]

        // check if score is bigger or equal, then we're allowed to show the item
        if (role_score < required_score) {
            el.remove();
        }
    }
})

export default Vue