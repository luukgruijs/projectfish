<template>
    <div class="container">
        <sidenav></sidenav>
        <div class="col manage">
            <div class="header">
                <h1>Users</h1>
                <a href="#" @click.prevent="openActionBar()">Add new user</a>
            </div>

            <datatable :data="users" :fields="['name', 'email', 'role']"></datatable>
        </div>
        <userbar id="userbar"></userbar>
    </div>
</template>

<script>
    import sidenav from "./sidenav.vue"
    import datatable from "./datatable.vue"
    import userbar from "./userbar.vue"
    import { http } from "../../client"

    export default {
        name: "users",
        components: { sidenav, datatable, userbar },

        data() {
            return {
                users: [],
            }
        },

        created() {
            http.get("users").then((users) => {
                this.users = users.data
            })
        },

        methods: {
            openActionBar: () => {
                document.getElementById("userbar").classList.add("open")
            },
        }
    }
</script>