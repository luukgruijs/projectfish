<template>
    <div class="login">
        <div class="login__form">
            <div class="logo">
                <img src="../assets/img/fish.svg">
            </div>
            <h1>Reset your password</h1>
            <form>
                <input type="email" placeholder="email" v-model="email" required />
                <input type="submit" value="Send password reset link" class="button action" @click.prevent="resetPassword()"/>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "forgot_password",
        data() {
            return {
                "email": ""
            }
        },
        methods: {
            ...mapActions({
                reset: "resetPassword",
            }),
            resetPassword() {
                const email = this.email;
                this.reset({ email });
            }
        }
    }
</script>

<style lang="scss">
    .login {
        display: flex;
        align-items: center;
        width: 100%;
    }
</style>