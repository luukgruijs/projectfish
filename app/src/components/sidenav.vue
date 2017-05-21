<template>
    <aside class="sidenav">
        <ul>
            <li>
                <router-link to="orders">Orders</router-link>
            </li>
            <li>
                <router-link to="items">Manage lunch items</router-link>
            </li>
            <li>
                <router-link to="users">Manage users</router-link>
            </li>
            <li>
                <router-link to="settings">Settings</router-link>
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