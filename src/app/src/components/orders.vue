<template>
    <div class="container">
        <sidenav></sidenav>
        <div class="col manage">
            <div class="header">
                <h1>Lunch orders</h1>
            </div>
            <datatable :data="orders" :fields="['amount', 'created_at', 'orders']" @rowClicked="forward($event)"></datatable>
        </div>
    </div>
</template>

<script>
    import datatable from "./datatable.vue"
    import sidenav from "./sidenav.vue"
    import { mapGetters, mapActions } from "vuex"

    export default {
        name: "orders",
        components: { sidenav, datatable },
        computed: {
            ...mapGetters([
                "orders"
            ])
        },
        created() {
            this.get()
        },
        methods: {
            ...mapActions({
                get: "getOrders"
            }),
            forward(item) {
                this.$router.push({path: `orders/${item._id}`})
            }
        }
    }
</script>