<template>
    <div class="login">
        <div class="login__form">
            <div class="logo">
                <img src="../assets/img/fish.svg">
            </div>
            <form>
                <input type="text" placeholder="email" v-model="email" required />
                <input type="password" placeholder="password" v-model="password" required />
                <input type="submit" value="login" class="button action" @click.prevent="login()"/>
            </form>

            <router-link :to="{name: 'forgot_password'}">I forgot my password</router-link>
        </div>
    </div>
</template>

<script>

    export default {
        name: "login",
        data() {
            return {
                "email": "",
                "password": ""
            }
        },
        methods: {
            login() {

                let user = {
                    "email": this.email,
                    "password": this.password
                }

                this.$store.dispatch('login', user);
            }
        }
    }
</script>

<style lang="scss">
    .login {
        display: flex;
        align-items: center;
        width: 100%;
        .login__form {
            width: 350px;
            height: 400px;
            background-color: white;
            border: 2px solid $gray;
            padding: 30px 50px;
            box-sizing: border-box;
            margin: 0 auto;
            .logo {
                text-align: center;
                img {
                    height: 50px;
                    margin-bottom: 50px;
                }
            }
            h1 {
                padding: 10px 0 20px 0;
            }
            form {
                input {
                    width: 100%;
                    height: 35px;
                    border: 2px solid $gray;
                    margin-bottom: 15px;
                    padding-left: 10px;
                    &[type='submit'] {
                        border: none;
                    }
                }
            }
        }
    }
</style>