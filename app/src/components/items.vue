<template>
    <div class="container">
        <sidenav></sidenav>
        <div class="col manage">
            <div class="header">
                <h1>Lunch items</h1>
                <a href="#" @click.prevent="openActionBar()">Add more items</a>
            </div>

            <datatable :data="items" :fields="['name', 'category', 'price']" @rowClicked="onEdit($event)" @deleteClicked="onDelete($event)" :deleteable="true"></datatable>
        </div>
        <itembar id="itembar"></itembar>
    </div>
</template>

<script>
    import sidenav from "./sidenav.vue"
    import datatable from "./datatable.vue"
    import itembar from "./itembar.vue"

    import { mapGetters, mapActions } from "vuex"
    import { types } from "../store/items.js"

    export default {
        name: "items",
        components: { sidenav, datatable, itembar },

        computed: {
            ...mapGetters([
                "items"
            ])
        },

        created() {
            this.get()
        },

        methods: {
            ...mapActions({
                get: "getItems",
                delete: "deleteItem"
            }),
            openActionBar() {
                this.$store.commit(types.SET_ITEM_EDITMODE, true)
            },
            onEdit(event) {
                this.$store.commit(types.SET_SELECTED_ITEM, event)
            },
            onDelete(event) {
                this.delete(event._id);
            }
        }
    }
</script>