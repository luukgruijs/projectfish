<template>
    <div class="container">
        <sidenav></sidenav>
        <div class="col manage">
            <div class="header">
                <h1>Settings</h1>
                <a href="#" @click.prevent="openActionBar()">Edit settings</a>
            </div>
            <div class="settings">
                <table>
                    <tbody>
                        <tr>
                            <th>Budget per person</th>
                            <td>{{ setting.budget | currency }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <settingsbar id="settingsbar"></settingsbar>
    </div>
</template>

<script>
    import sidenav from "./sidenav.vue"
    import settingsbar from "./settingsbar.vue"
    import { types } from "../store/settings.js"
    import { mapGetters, mapActions } from "vuex";

    export default {
        name: "settings",
        components: { sidenav, settingsbar },

        computed: {
            ...mapGetters([
                "setting"
            ]),
        },

        created() {
            this.get();
        },

        methods: {
            ...mapActions({
                get: "getSetting"
            }),
            openActionBar() {
                this.$store.commit(types.SET_SETTING_EDITMODE, true)
            },
        }

    }
</script>

<style lang="scss">
    .settings {
        margin-top: 25px;
        table {
            width: 100%;
            tbody {
                tr {
                    height: 40px;
                    th, td {
                        width: 30%;
                        text-align: left;
                    }
                }
            }
        }
    }
</style>