<template>
    <aside class="sidenav">
        <ul>
            <li>
                <router-link :to="{name: 'orders'}" v-permissions:admin>Lunch orders</router-link>
            </li>
            <li>
                <router-link :to="{name: 'items'}" v-permissions:admin>Manage lunch items</router-link>
            </li>
            <li>
                <router-link :to="{name: 'users'}" v-permissions:admin>Manage users</router-link>
            </li>
            <li>
                <router-link :to="{name: 'settings'}" v-permissions:admin>Settings</router-link>
            </li>
        </ul>
    </aside>
</template>

<script>
    export default {
        name: "sidenav",
        data() {
            return {}
        }
    }
</script>

<style lang="scss">
    .sidenav {
        margin-top: 150px;
        ul {
            li {
                list-style-type: none;
                a {
                    line-height: 40px;
                    text-decoration: none;
                    color: $black;
                    &.router-link-active {
                        position: relative;
                        &:after {
                            content: "";
                            border-bottom: 3px solid $green;
                            position: absolute;
                            left: 0;
                            width: 100%;
                            bottom: -7.5px;
                        }
                    }
                }
            }
        }
    }
</style>