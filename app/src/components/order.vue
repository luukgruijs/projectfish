<template>
    <div class="container">
        <sidenav></sidenav>
        <div class="col manage" v-if="order">
            <div class="header">
                <h1>Order from {{order.created_at}}</h1>
            </div>
            <div class="row">
                <canvas id="countchart"></canvas>
            </div>
            <div class="row">
                <h2>Who ordered what</h2>
                <div class="orders" v-for="order in order.orders">
                    <div class="order">
                        <span>{{order.user.name}}</span>
                        <span v-for="item in order.items">
                            {{item.item.name + " "}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import sidenav from "./sidenav.vue"
    import Chart from "chart.js"

    export default {
        name: "order",
        components: { sidenav },
        data() {
            return {
                "order": {},
                "count_items": {},
                "users": [],
            }
        },
        created() {
            var self = this
            let orders = this.$http.get(`lunchorders/${this.$route.params.id}?_populate=orders`)
            let users = this.$http.get("users")

            Promise.all([orders, users]).then((data) => {

                self.order = data[0].body
                self.users = data[1].body

                // get count of unique item names
                this.count_items = self.order.orders.reduce((items, order) => {
                    order.items.map((item) => {
                        if (items[item.item.name]) {
                            items[item.item.name] += 1
                        } else {
                            items[item.item.name] = 1;
                        }
                        return item
                    })

                    return items
                }, {})

                // generate graph and table
                this.generateGraph()
                this.generateTable()
            })
        },

        methods: {
            generateGraph() {
                // select canvas element
                let ctx = document.getElementById("countchart")

                let data = {
                    "labels": Object.keys(this.count_items).map((item) => {
                        return item
                    }),
                    "datasets": [{
                        "label": "Count per item",
                        "data": Object.keys(this.count_items).map((item) => {
                            return this.count_items[item]
                        }),
                        "backgroundColor": [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        "borderColor": [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        "borderWidth": 1
                    }]
                }

                // set options for chart
                let options = {
                    "scales": {
                        "yAxes": [{
                            "ticks": {
                                "beginAtZero": true
                            }
                        }]
                    }
                }

                // generate chart of count items
                let barchart = new Chart(ctx, {
                    "type": "horizontalBar",
                    "data": data,
                    "options": options
                })
            },
            generateTable() {
                let order_data = this.order.orders.map((order) => {
                    let user = this.users.filter((user) => {
                        if (order.user === user._id) {
                            return true
                        }
                    })

                    order.user = user[0]

                    return order
                })

                this.order.orders = order_data
            }
        }
    }
</script>

<style lang="scss">
    h2 {
        text-transform: uppercase;
        font-weight: 700 !important;
        margin-top: 50px !important;
    }

    .orders {
        margin-top: 20px;
        border: 1px solid darken($gray, 5%);
        .order {
            display: flex;
            line-height: 60px;
            background-color: white;
            border-bottom: 1px solid darken($gray, 5%);
            span {
                width: 50%;
                padding-left: 10px;
            }
        }
    }
</style>