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
                            <td>{{ settings.budget | currency }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <settingsbar id="settingsbar" :item="settings" @reload="fetch()"></settingsbar>
    </div>
</template>

<script>
    import sidenav from "./sidenav.vue"
    import settingsbar from "./settingsbar.vue"

    export default {
        name: "settings",
        components: { sidenav, settingsbar },

        data() {
            return {
                settings: {},
            }
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch() {
                this.$http.get("settings").then((settings) => {
                    this.settings = settings.body[0]
                })
            },
            openActionBar() {
                document.getElementById("settingsbar").classList.add("open")
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