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
                <input type="submit" value="login" class="button action" @click.prevent="setPassword()"/>
            </form>
        </div>
    </div>
</template>

<script>

    export default {
        name: "setpassword",
        data() {
            return {
                "password": "",
                "password2": "",
            }
        },
        methods: {
            setPassword() {

                let password = {
                    "password": this.password,
                    "password2": this.password2
                }

                this.$http.post("password", user).then((response) => {
                    if (response.status === 200) {
                        this.$router.push("/login")
                    }
                })
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