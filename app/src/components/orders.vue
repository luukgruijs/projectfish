<template>
    <div class="container">
        <sidenav></sidenav>
        <div class="col manage">
            <div class="header">
                <h1>Lunch orders</h1>
            </div>
            <datatable :data="orders" :fields="['amount', 'created_at', 'user']"></datatable>
        </div>
    </div>
</template>

<script>
    import datatable from "./datatable.vue"
    import sidenav from "./sidenav.vue"

    export default {
        name: "orders",
        components: { sidenav, datatable },
        data() {
            return {
                orders: [],
            }
        },
        created() {
            this.$http.get("orders").then((orders) => {
                this.orders = orders.body
            })
        }
    }
</script>