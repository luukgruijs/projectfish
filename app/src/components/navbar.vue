<template>
    <header class="navbar">
        <div class="container">
            <ul>
                <li>
                    <router-link to="dashboard">Dashboard</router-link>
                </li>
                <li>
                    <router-link to="items">manage</router-link>
                </li>
            </ul>
            <ul>
                <li>
                    <router-link to="order" class="button action">order now</router-link>
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
        ul {
            &:first-of-type {
                margin-right: auto;
            }
            &:last-of-type {
                margin-left: auto;
            }
            li {
                display: inline-block;
                a {
                    text-decoration: none;
                    color: $black;
                    line-height: 60px;
                    margin-right: 10px;
                }
            }
        }
    }
</style>