<template>
    <div class="container">
        <sidenav></sidenav>
        <div class="col manage">
            <h1>Lunch items</h1>
            <datatable :data="orders" :fields="['amount, created_at, items']"></datatable>
        </div>
    </div>
</template>

<script>
    import datatable from "./datatable.vue"
    import sidenav from "./sidenav.vue"
    import { http } from "../../client"

    export default {
        name: "orders",
        components: { sidenav, datatable },
        data() {
            return {
                orders: [],
            }
        },
        created() {
            http.get("orders").then((orders) => {
                this.orders = orders.data
            })
        }
    }
</script>