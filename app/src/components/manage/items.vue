<template>
    <div class="container">
        <sidenav></sidenav>
        <div class="col manage">
            <h1>Items</h1>
            <div class="items">
                <datatable :data="items"></datatable>
            </div>
        </div>
    </div>
</template>

<script>
    import sidenav from "./sidenav.vue"
    import datatable from "./datatable.vue"

    import { items } from "../../client"

    export default {
        name: "items",
        components: { sidenav, datatable },

        data() {
            return {
                items: [],
            }
        },

        created() {
            items.query().then((items) => {
                this.items = items.data
            })
        }
    }
</script>

<style lang="scss">
    .items {

    }
</style>