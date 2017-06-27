<template>
    <div class="container">
        <sidenav></sidenav>
        <div class="col manage">
            <div class="header">
                <h1>Users</h1>
                <a href="#" @click.prevent="openActionBar()">Add more users</a>
            </div>

            <datatable :data="users" :fields="['name', 'email', 'role']" @rowClicked="onEdit($event)" @deleteClicked="onDelete($event)"></datatable>
        </div>
        <userbar id="userbar" :user="active_user" @reload="fetch()"></userbar>
    </div>
</template>

<script>
    import sidenav from "./sidenav.vue"
    import datatable from "./datatable.vue"
    import userbar from "./userbar.vue"

    export default {
        name: "users",
        components: { sidenav, datatable, userbar },

        data() {
            return {
                active_user: "",
                users: [],
            }
        },

        created() {
            this.fetch()
        },

        methods: {
            fetch() {
                this.$http.get("users").then((users) => {
                    this.users = users.body
                })
            },
            openActionBar() {
                document.getElementById("userbar").classList.add("open")
            },
            onEdit(event) {
                this.active_user = event
                document.getElementById("userbar").classList.add("open")
            },
            onDelete(event) {
                var self = this

                let user = event;
                user.disabled = true;

                this.$http.post(`users/${user._id}`).then((response) => {

                    self.fetch()
                })
            }
        }
    }
</script>