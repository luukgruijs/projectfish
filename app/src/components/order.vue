<template>
    <div class="container">
        <sidenav></sidenav>
        <div class="col manage" v-if="order">
            <div class="header">
                <h1>Order from {{order.created_at | date}}</h1>
            </div>
            <div class="row">
                <canvas id="countchart"></canvas>
            </div>
            <div class="row">
                <h2>Who ordered what</h2>
                <div class="orders">
                    <div class="order" v-for="order in order.orders">
                        <span>{{order.user}}</span>
                        <span v-for="item in order.items">
                            {{item.name + " "}}
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

    import { mapGetters, mapActions } from "vuex";

    export default {
        name: "order",
        components: { sidenav },
        computed: {
            ...mapGetters({
                order: "selected_order",
                users: "users"
            }),
        },
        data() {
            return {
                count_items: 0,
            }
        },
        created() {
            this.get(this.$route.params.id);

            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "SET_SELECTED_ORDER") {
                    this.countItems()
                }
            })
        },

        methods: {
            ...mapActions({
                get: "getOrder"
            }),
            countItems() {
                const items = this.order.orders.reduce((items, order) => {
                    order.items.map((item) => {
                        if (items[item.name]) {
                            items[item.name] += 1
                        } else {
                            items[item.name] = 1;
                        }
                        return item
                    })

                    return items
                }, {})

                this.count_items = items;

                this.generateGraph()
            },
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
            },
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
        margin: 20px 0;
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