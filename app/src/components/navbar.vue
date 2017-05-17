<template>
    <header class="navbar">
        <div class="container">
            <ul>
                <li>
                    <router-link to="dashboard">Dashboard</router-link>
                </li>
                <li>
                    <router-link to="manage/orders">manage</router-link>
                </li>
            </ul>
            <div class="logo">
                <img src="../assets/img/fish.svg">
            </div>
            <ul>
                <li>
                    <router-link to="/ordernow" class="button action">order now</router-link>
                </li>
                <li>
                    Luuk Gruijs
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {}
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
                a {
                    text-decoration: none;
                    color: $black;

                    margin-right: 10px;
                }
            }
        }
    }
</style>