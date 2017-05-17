<template>
    <div class="action__bar">
        <div class="action__bar--inner">
            <div class="header">
                <h2>add user</h2>
                <i class="icon close" @click.prevent="closeActionBar()">x</i>
            </div>
            <form>
                <fieldset>
                    <input type="text" placeholder="name" v-model="name" required/>
                    <input type="text" placeholder="email" v-model="email" required/>
                    <input type="password" placeholder="password" v-model="password" required/>
                    <input type="submit" value="add user" class="button action" @click.prevent="createUser()">
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script>

    import { http } from "../../client"

    export default {
        name: "userbar",
        data() {
            return {
                name: "",
                email: "",
                password: "",
            }
        },
        methods: {
            closeActionBar() {
                document.querySelector(".action__bar").classList.remove("open")
            },
            createUser() {
                if (this.name && this.email && this.password) {

                    let user = {
                        "name": this.name,
                        "email": this.email,
                        "password": this.password
                    }

                    http.post("users", user).then((item) => {
                        bus.$emit("open", "test", 5000)
                        document.querySelector(".action__bar").classList.remove("open")
                    })
                }
            }
        }
    }
</script>