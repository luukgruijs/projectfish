<template>
    <div class="action__bar" v-bind:class="{ open: open }">
        <div class="action__bar--inner">
            <div class="single__create">
                <div class="header">
                    <h2><span v-if="!edit_mode">Add</span> <span v-if="edit_mode"> Edit</span> user</h2>
                    <i class="material-icons close" @click.prevent="closeActionBar()">close</i>
                </div>
                <form>
                    <fieldset>
                        <input type="text" placeholder="name" v-model="name" required/>
                        <input type="text" placeholder="email" v-model="email" required/>
                        <select v-model="role" required>
                            <option value="" disabled selected>Select permission</option>
                            <option value="user" v-if="role !== 'admin'">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <input type="submit" value="Save user" class="button action" @click.prevent="saveUser()">
                    </fieldset>
                </form>
            </div>
            <div class="multiple__create" v-if="!edit_mode">
                <div class="header">
                    <h2>Add multiple using csv</h2>
                </div>
                <dropzone id="user_dropzone" url="http://localhost:8002/v1/csv/users" v-bind:headers="headers" v-on:vdropzone-success="uploadSuccess">
                    <input type="hidden" name="token" value="xxx">
                </dropzone>
            </div>
        </div>
    </div>
</template>

<script>

    import Dropzone from "vue2-dropzone"

    import { mapGetters, mapActions } from "vuex";
    import { types } from "../store/users.js"

    export default {
        name: "userbar",
        components: { Dropzone },
        computed: {
            ...mapGetters({
                open: "user_edit_mode",
                user: "selected_user",
            })
        },
        data() {
            return {
                edit_mode: false,
                email: "",
                name: "",
                role: "",
                _id: "",
                headers: {
                    "x-access-token": JSON.parse(window.sessionStorage.getItem("user")).token
                }
            }
        },
        watch: {
            user(value) {
                if (value) {
                    this.name = value.name
                    this.email = value.email
                    this.role = value.role
                    this._id = value._id
                    this.edit_mode = true
                } else {
                    this.edit_mode = false
                }
            },
            edit_mode(value) {
                if (!value) {
                    this.name = ""
                    this.email = ""
                }
            }
        },
        methods: {
            ...mapActions({
                create: "createUser",
                update: "updateUser"
            }),
            closeActionBar() {
                this.name = ""
                this.email = ""
                this.$store.commit(types.SET_USER_EDITMODE, false)
            },
            saveUser() {
                if (this.name && this.email) {
                    let user = {
                        "name": this.name,
                        "email": this.email,
                    }

                    if (this.edit_mode) {
                        this.update({
                            user,
                            id: this._id
                        })
                    } else {
                        this.create(user)
                    }
                }
            },
            uploadSuccess() {
                // show message
                bus.$emit("open__snackbar", "users uploaded", 5000)

                // close action bar
                this.closeActionBar()

                // emit reload so we fetch the latest items
                this.$store.dispatch("getUsers")
            }
        }
    }
</script>