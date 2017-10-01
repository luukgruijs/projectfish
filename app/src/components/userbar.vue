<template>
    <div class="action__bar">
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
                            <option value="user">User</option>
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
                <dropzone id="user_dropzone" url="http://localhost:8000/v1/csv/users" v-bind:headers="headers" v-on:vdropzone-success="uploadSuccess">
                    <input type="hidden" name="token" value="xxx">
                </dropzone>
            </div>
        </div>
    </div>
</template>

<script>

    import Dropzone from "vue2-dropzone"

    export default {
        name: "userbar",
        components: { Dropzone },
        props: ["user"],
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
            closeActionBar() {
                this.edit_mode = false;
                document.querySelector(".action__bar").classList.remove("open")
            },
            saveUser() {
                if (this.name && this.email) {


                    let user = {
                        "name": this.name,
                        "email": this.email,
                    }

                    if (this.edit_mode) {
                        user._id = this._id

                        this.$http.post(`users/${user._id}`, user).then((response) => {
                            bus.$emit("open__snackbar", `succesfully updated ${user.name}`, 5000)
                            document.querySelector(".action__bar").classList.remove("open")

                            // reload
                            this.$emit("reload")
                        })
                    } else {
                        this.$http.post("users", user).then((response) => {
                            bus.$emit("open__snackbar", `succesfully created ${user.name}`, 5000)
                            document.querySelector(".action__bar").classList.remove("open")

                            // reload
                            this.$emit("reload")
                        })
                    }
                }
            },
            uploadSuccess() {
                // show message
                bus.$emit("open__snackbar", "users uploaded", 5000)

                // close action bar
                this.closeActionBar()

                // emit reload so we fetch the latest items
                this.$emit("reload")
            }
        }
    }
</script>