<template>
    <div class="login">
        <div class="login__form">
            <div class="logo">
                <img src="../assets/img/fish.svg">
            </div>
            <h1>Set your password</h1>
            <form>
                <input type="password" placeholder="password" v-model="password" required />
                <input type="password" placeholder="repeat password" v-model="password2" required />
                <input type="submit" value="Set password" class="button action" @click.prevent="setPassword()"/>
            </form>
        </div>
    </div>
</template>

<script>

    import { mapActions } from "vuex";

    export default {
        name: "setpassword",
        data() {
            return {
                "password": "",
                "password2": "",
            }
        },
        methods: {
            ...mapActions({
                set: 'setPassword'
            }),
            setPassword() {

                const new_password = {
                    password: this.password,
                    password2: this.password2,
                    reset_token: this.$route.params.token,
                    user: this.$route.params.user,
                }

                this.set(new_password);
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
                text-align: center;
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