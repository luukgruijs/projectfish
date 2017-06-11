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

    export default {
        name: "orders",
        components: { sidenav, datatable },
        data() {
            return {
                orders: [],
            }
        },
        created() {
            this.$http.get("lunchorders?_populate=orders").then((orders) => {

                this.orders = orders.body.map((order) => {
                    return {
                        "amount": order.orders.reduce((amount, order) => {
                            return amount + order.amount
                        }, 0),
                        "created_at": order.created_at,
                        "orders": order.orders.length,
                        "_id": order._id
                    }
                })
            })
        },
        methods: {
            forward(item) {
                this.$router.push({path: `orders/${item._id}`})
            }
        }
    }
</script>