<template>
    <div class="order_now">
        <h1>Order</h1>
        <form>
            <input type="text" placeholder="search items" v-model="search"/>
        </form>
        <div class="row">
            <div class="items">
                <div class="item" v-for="item in filtered_items" @click="addToBasket(item, $event)">
                    <span><a href="#"></a></span><p>{{item.name}}</p><p>{{item.price | currency}}</p>
                </div>
                <div class="no_items" v-if="filtered_items.length === 0">
                    <p>No items to display</p>
                </div>
            </div>
            <div class="basket">
                <div class="basket__inner">
                    <h2>Your order</h2>
                    <div class="item" v-for="item in basket">
                        <p>{{item.name}}</p><p>{{item.price | currency}}</p>
                    </div>
                    <div class="basket__total">
                        <b>Total: </b> <span>{{basket_total | currency}} of {{setting.budget | currency}}</span>
                    </div>
                    <div class="submit__order" v-if="basket.length > 0">
                        <a href="#" @click.prevent="submitOrder()" class="button action">Send order</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapGetters, mapActions } from "vuex"
    import { types } from "../store/ordernow.js"

    export default {
        name: "order_now",
        data() {
            return {
                "search": "",
                "budget": 0,
            }
        },

        created() {
            this.fetch()
        },

        computed: {
            ...mapGetters([
                "basket",
                "basket_total",
                "items",
                "setting"
            ]),
            filtered_items() {
                return this.items.filter((item) => {
                    return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                })
            }
        },

        created() {
            this.getItems();
            this.getSetting();
        },

        methods: {
            ...mapActions({
                getItems: "getItems",
                getSetting: "getSetting",
                add: "addTobasket",
                remove: "removeFromBasket",
                order: "sendOrder"
            }),
            addToBasket(item, event) {
                // item is allready active
                if (event.target.parentElement.classList.contains("active")) {
                    event.target.parentElement.classList.remove("active")
                    this.remove(item)
                } else {
                    event.target.parentElement.classList.add("active")
                    this.add(item)
                }
            },
            submitOrder() {
                var self = this

                if (this.basket_total <= this.setting.budget) {

                    let order = {
                        "amount": this.basket.reduce((amount, item) => {
                            return amount + item.price
                        }, 0),
                        "items": this.basket.reduce((basket, item) => {
                            let obj = item;
                            obj.quantity = 1

                            basket.push(obj)
                            return basket
                        }, []),
                        "user": JSON.parse(window.sessionStorage.getItem("user"))._id
                    }

                    this.order(order)

                    // remove active class
                    let items = document.querySelectorAll(".item.active")
                    items.forEach((item) => {
                        item.classList.remove("active")
                    })
                } else {
                    bus.$emit("open__snackbar", "Your order exceeds the maximum budget", 5000)
                }
            }
        }
    }
</script>

<style lang="scss">
    .order_now {
        max-width: 960px;
        height: 100%;
        width: 100%;
        margin: 0 auto;
        h1 {
            padding-top: 100px;
            margin-bottom: 20px;
        }
        form {
            width: 100%;
            display: flex;
            input {
                width: 100%;
                line-height: 40px;
                padding-left: 10px;
                margin-right: auto;
                border: 1px solid darken($gray, 5%);
                font-size: 12px;
                font-weight: 400;
                outline: none;
            }
        }

        .row {
            display: flex;
            height: 70%;
            margin-top: 20px;
            .items {
                width: 60%;
                overflow-y: scroll;
                border: 1px solid darken($gray, 5%);
                .item {
                    display: flex;
                    line-height: 50px;
                    background-color: white;
                    border-bottom: 1px solid darken($gray, 5%);
                    &.active {
                        background-color: $light-gray;
                        span {
                            a {
                                background-color: $green;
                            }
                        }
                    }
                    span {
                        width: 30%;
                        a {
                            width: 15px;
                            height: 15px;
                            border: 2px solid $gray;
                            border-radius: 50%;
                            display: block;
                            margin: 15px 0 0 15px;
                        }
                    }
                    p  {
                        width: 35%;
                    }
                }
                .no_items {
                    text-align: center;
                    p {
                        line-height: 50px;
                        background-color: white;
                        border-bottom: 1px solid darken($gray, 5%);
                    }
                }
            }
            .basket {
                width: 37.5%;
                margin-left: auto;
                min-height: 400px;
                background-color: white;
                display: block;
                border: 1px solid darken($gray, 5%);
                &__inner {
                    padding: 15px;
                    h2 {
                        text-transform: uppercase;
                        font-weight: 700;
                        margin-bottom: 20px;
                    }

                    .item {
                        display: flex;
                        text-align: left;
                        p {
                            line-height: 35px;
                            &:first-of-type {
                                margin-right: auto;
                            }
                            &:last-of-type {
                                margin-left: auto;
                            }
                        }
                    }

                    .basket__total {
                        display: flex;
                        margin-top: 40px;
                        b {
                            margin-right: auto;
                        }
                        span {
                            margin-left: auto;
                        }
                    }

                    .submit__order {
                        margin-top: 40px;
                        a {
                            width: 200px;
                            text-align: center;
                            text-decoration: none;
                        }
                    }
                }
            }
        }
    }
</style>