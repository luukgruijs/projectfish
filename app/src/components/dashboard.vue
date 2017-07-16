<template>
    <div class="dashboard">
        <div class="container">
            <div class="order__chart">
                <canvas id="orderchart"></canvas>
            </div>
        </div>
        <div class="container">
            <div class="popular__items">
                <h2>Most popular items</h2>
                <canvas id="popularitemschart"></canvas>
            </div>
            <div id="latestorders" class="latest__orders">
                <h2>Latest orders</h2>
                <p><span>User</span><span>Items</span></p>
                <ul>
                    <li v-for="order in latest_orders">
                        <div>{{order.user.name}}</div>
                        <div>{{order.items | truncate(40)}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

    import Chart from "chart.js"
    import { startOfDay, format } from "date-fns"

    export default {
        name: "dashboard",
        data () {
            return {
                "orders": [],
                "users": [],
                "latest_orders": []
            }
        },
        mounted() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                var self = this

                const orders = this.$http.get("orders")
                const users = this.$http.get("users")

                // fetch all the orders
                Promise.all([orders, users]).then((data) => {

                    self.orders = data[0].body
                    self.users = data[1].body

                    self.drawOrderChart()
                    self.drawItemsChart()
                    self.generateOrderList()
                })
            },
            generateOrderList() {
                var self = this
                // let latest_orders = this.orders.slice(-15)

                // generate list with latest orders
                this.latest_orders = self.orders.map((order) => {

                    // find user that corresponts to order.user._id
                    let user = self.users.filter((user) => {
                        if (order.user === user._id) {
                            return true
                        }
                    })

                    // assing user to object
                    order.user = user[0]

                    // get array of item names
                    order.items = order.items.reduce((item_string, item, index) => {
                        item_string += item.item.name
                        if (index + 1 !== order.items.length) {
                            item_string += ","
                        }

                        return item_string
                    }, "")

                    // return order
                    return order
                })
            },
            drawOrderChart() {

                var self = this

                const options = {
                    "maintainAspectRatio": false
                }

                const data = () => {

                    // create object with day + order count
                    let order_count = self.orders.reduce((orders_per_day, order) => {

                        let order_date = format(startOfDay(order.created_at), "DD-MM-YYYY")

                        if (orders_per_day[order_date]) {
                            orders_per_day[order_date] += 1
                        } else {
                            orders_per_day[order_date] = 1
                        }

                        return orders_per_day

                    }, {})

                    let data = {
                        "datasets": []
                    }

                    // set labels
                    data.labels = Object.keys(order_count).map((order) => {
                        return order
                    })

                    // push data
                    data.datasets.push({
                        "label": "Order count per day",
                        "data": Object.keys(order_count).map((order) => {
                            return order_count[order]
                        }),
                        "borderColor": "rgb(132, 189, 147)",
                        "fill": false
                    })

                    return data
                }

                // get graph context
                let ctx = document.getElementById("orderchart")

                // draw chart
                let linechart = new Chart(ctx, {
                    "type": "line",
                    "data": data(),
                    "options": options
                })
            },
            drawItemsChart() {
                var self = this

                // get count of unique item names
                let count_items = self.orders.reduce((items, order) => {
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

                let ctx = document.getElementById("popularitemschart")

                let data = {
                    "labels": Object.keys(count_items).map((item) => {
                        return item
                    }),
                    "datasets": [{
                        "label": "Count per item",
                        "data": Object.keys(count_items).map((item) => {
                            return count_items[item]
                        }),
                        "backgroundColor": "rgb(132, 189, 147)",
                        "borderColor": "rgb(132, 189, 147)",
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
            }
        }
    }
</script>

<style lang="scss">
    .dashboard {
        width: 100%;
        margin-top: 75px;
        height: 100%;
        .container {
            height: auto;
            &:last-child {
                margin-top: 50px;
            }
            .order__chart {
                width: 100%;
                height: 300px;
                position: relative;
            }

            .latest__orders, .popular__items{
                width: 45%;
                h2 {
                    margin-bottom: 20px;
                }
            }
            .popular__items {
                margin-right: auto;
                canvas {
                }
            }
            .latest__orders {
                margin-left: auto;
                p {
                    width: 100%;
                    display: flex;
                    margin-bottom: 5px;
                    span {
                        width: 50%;
                        padding-left: 10px;
                    }
                }
                ul {
                    overflow-y: scroll;
                    max-height: 350px;
                    li {
                        line-height: 60px;
                        border: 1px solid $gray;
                        background-color: $white;
                        display: flex;
                        &:nth-child(even) {
                            background-color: darken(white, 1%)
                        }
                        div {
                            width: 50%;
                            padding: 0 10px;
                        }
                    }
                }
            }
        }
    }
</style>