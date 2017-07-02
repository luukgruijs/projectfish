<template>
    <div class="dashboard">
        <div class="container">
            <div class="order__chart">
                <canvas id="orderchart"></canvas>
            </div>
        </div>
        <div class="container">
            <div id="latestorders">
                <ul>
                    <li v-for="order in latest_orders">
                        <div>{{order.user}}</div>
                        <div>
                            <span v-for="item in order.items">
                                {{item.item.name + " "}}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <div id="ordertypeschart"></div>
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
                    self.generateOrderList()
                })
            },
            generateOrderList() {
                var self = this
                let latest_orders = this.orders.slice(-15)

                // generate list with latest orders
                this.latest_orders = latest_orders.map((order) => {

                    // find user that corresponts to order.user._id
                    let user = self.users.filter((user) => {
                        if (order.user === user._id) {
                            return true
                        }
                    })

                    // assing user to object
                    order.user = user[0]

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
                        })
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
            }
        }
    }
</script>

<style lang="scss">
    .dashboard {
        width: 100%;
        margin-top: 75px;
        height: 100%;
        .order__chart {
            width: 100%;
            height: 300px;
            position: relative;
        }
    }
</style>