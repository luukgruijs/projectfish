<template>
    <header class="navbar" v-if="current_user.token">
        <div class="container">
            <ul>
                <li>
                    <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'orders'}" v-permissions:admin>Manage</router-link>
                </li>
            </ul>
            <div class="logo">
                <img src="../assets/img/fish.svg">
            </div>
            <ul>
                <li>
                    <router-link :to="{name: 'ordernow'}" class="button action">Order now</router-link>
                </li>
                <li @click.prevent="logout()" class="logout">Logout</li>
            </ul>
        </div>
    </header>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters([
              'current_user'
            ])
        },
        methods: {
            logout() {
                window.sessionStorage.removeItem('user');
                this.$router.push("/")
            },
        }
    }
</script>

<style lang="scss">
    .navbar {
        width: 100%;
        display: flex;
        border-bottom: 1px solid $gray;
        position: fixed;
        top: 0;
        left: 0;
        padding: 0 15px;
        background-color: white;
        box-shadow: 0 2px 2px -2px rgba(0,0,0,.15);
        z-index: 1;
        img {
            height: 50px;
            padding: 5px 0;
        }
        ul {
            &:first-of-type {
                margin-right: auto;
            }
            &:last-of-type {
                margin-left: auto;
            }
            li {
                display: inline-block;
                line-height: 60px;
                position: relative;
                ul {
                    width: 100px;
                    background-color: white;
                    position: absolute;
                    bottom: 0;
                }
                a {
                    text-decoration: none;
                    color: $black;

                    margin-right: 10px;
                }
            }
        }
    }
</style>