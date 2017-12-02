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
        <userbar id="userbar"></userbar>
        <confirm v-if="show_confirm" :item="active_user" :message="confirm_message" @confirm="onDelete($event)" @cancel="closeConfirm()"></confirm>
    </div>
</template>

<script>
    import sidenav from "./sidenav.vue"
    import datatable from "./datatable.vue"
    import userbar from "./userbar.vue"
    import confirm from "./confirm.vue"

    import { mapGetters, mapActions } from "vuex"
    import { types } from "../store/users.js"

    export default {
        name: "users",
        components: { sidenav, datatable, userbar, confirm },
        computed: {
            ...mapGetters([
                "users"
            ])
        },

        data() {
            return {
                active_user: "",
                show_confirm: false,
                confirm_message: "",
            }
        },

        created() {
            this.get()
        },

        methods: {
            ...mapActions({
                get: "getUsers",
                delete: "deleteUser"
            }),
            openActionBar() {
                this.$store.commit(types.SET_USER_EDITMODE, true)
            },
            onEdit(event) {
                this.$store.commit(types.SET_SELECTED_USER, event)
            },
            confirmDelete(event) {
                this.active_user = event
                this.confirm_message = `Are your sure you want to disable ${event.name}?`
                this.show_confirm = true
            },
            closeConfirm() {
                this.show_confirm = false
            },
            onDelete(confirmed) {
                if (confirmed) {
                    this.delete(this.active_user._id);
                }
            }
        }
    }
</script>