<template>
    <div class="container">
        <sidenav></sidenav>
        <div class="col manage">
            <div class="header">
                <h1>Users</h1>
                <a href="#" @click.prevent="openActionBar()">Add more users</a>
            </div>

            <datatable :data="users" :fields="['name', 'email', 'role']" @rowClicked="onEdit($event)" @deleteClicked="confirmDelete($event)" :deleteable="true"></datatable>
        </div>
        <userbar id="userbar" :user="active_user" @reload="fetch()"></userbar>
        <confirm v-if="show_confirm" :item="active_user" :message="confirm_message" @confirm="onDelete(confirmed)"></confirm>
    </div>
</template>

<script>
    import sidenav from "./sidenav.vue"
    import datatable from "./datatable.vue"
    import userbar from "./userbar.vue"
    import confirm from "./confirm.vue"

    export default {
        name: "users",
        components: { sidenav, datatable, userbar, confirm },

        data() {
            return {
                active_user: "",
                users: [],
                show_confirm: false,
                confirm_message: "",
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
            confirmDelete(event) {
                this.active_user = event
                this.confirm_message = `Are your sure you want to disable ${event.name}?`
                this.show_confirm = true
            },
            onDelete(confirmed) {
                var self = this
                if (confirmed) {
                    let user = event;
                    user.disabled = true;

                    this.$http.post(`users/${user._id}`, user).then((response) => {
                        self.fetch()
                    })
                }
            }
        }
    }
</script>