<template>
    <div class="container">
        <sidenav></sidenav>
        <div class="col manage">
            <div class="header">
                <h1>Lunch items</h1>
                <a href="#" @click.prevent="openActionBar()">Add more items</a>
            </div>

            <datatable :data="items" :fields="['name', 'category', 'price']" @edit="onEdit($event)"></datatable>
        </div>
        <itembar id="itembar" :item="active_item" @reload="fetch()"></itembar>
    </div>
</template>

<script>
    import sidenav from "./sidenav.vue"
    import datatable from "./datatable.vue"
    import itembar from "./itembar.vue"
    import { http } from "../client"

    export default {
        name: "items",
        components: { sidenav, datatable, itembar },

        data() {
            return {
                items: [],
                active_item: {}
            }
        },

        created() {
            this.fetch()
        },

        methods: {
            fetch() {
                http.get("items").then((items) => {
                    this.items = items.data
                })
            },
            openActionBar() {
                document.getElementById("itembar").classList.add("open")
            },

            onEdit(event) {
                this.active_item = event
                document.getElementById("itembar").classList.add("open")
            }
        }
    }
</script>