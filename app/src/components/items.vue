<template>
    <div class="container">
        <sidenav></sidenav>
        <div class="col manage">
            <div class="header">
                <h1>Lunch items</h1>
                <a href="#" @click.prevent="openActionBar()">Add more items</a>
            </div>

            <datatable :data="items" :fields="['name', 'category', 'price']" @rowClicked="onEdit($event)" @deleteClicked="onDelete($event)"></datatable>
        </div>
        <itembar id="itembar" :item="active_item" @reload="fetch()"></itembar>
    </div>
</template>

<script>
    import sidenav from "./sidenav.vue"
    import datatable from "./datatable.vue"
    import itembar from "./itembar.vue"

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
                this.$http.get("items").then((items) => {
                    this.items = items.body
                })
            },
            openActionBar() {
                this.active_item = {};
                document.getElementById("itembar").classList.add("open")
            },
            onEdit(event) {
                this.active_item = event
                document.getElementById("itembar").classList.add("open")
            },
            onDelete(event) {
                this.$http.delete(`items/${event._id}`).then((response) => {

                    // remove the deleted item from the array
                    this.items = this.items.filter((item) => {
                        if (response.body.item._id === item._id) {
                            return false
                        } else {
                            return true
                        }
                    })
                })
            }
        }
    }
</script>