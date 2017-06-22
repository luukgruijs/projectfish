<template>
    <div class="order_now">
        <h1>Order</h1>
        <form>
            <input type="text" placeholder="search items" v-model="search"/>
        </form>
        <div class="row">
            <div class="items">
                <div class="item" v-for="item in filtered_items" @click="addToBasket(item, $event)">
                    <span><a href="#"></a></span><p>{{item.name}}</p><p>{{item.price}}</p>
                </div>
                <div class="no_items" v-if="filtered_items.length === 0">
                    <p>No items to display</p>
                </div>
            </div>
            <div class="basket">
                <div class="basket__inner">
                    <h2>Your order</h2>
                    <div class="item" v-for="item in basket">
                        <p>{{item.name}}</p><p>{{item.price}}</p>
                    </div>
                    <div class="basket__total">
                        <b>Total: </b> <span>{{basket_total}}</span>
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

    export default {
        name: "order_now",
        data() {
            return {
                "basket": [],
                "basket_total": 0,
                "items": [],
                "search": "",
            }
        },

        created() {
            this.$http.get("items").then((items) => {
                this.items = items.data
            })
        },

        computed: {
            filtered_items() {
                return this.items.filter((item) => {
                    return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                })
            }
        },

        methods: {
            addToBasket(item, event) {

                // item is allready active
                if (event.target.parentElement.classList.contains("active")) {
                    event.target.parentElement.classList.remove("active")

                    // remove item from basket
                    for (var i = 0; i < this.basket.length; i++) {
                        if (this.basket[i]._id === item._id) {
                            this.basket.splice(i, 1)
                            break
                        }
                    }
                } else {

                    // add item to basket
                    this.basket.push(item)
                    event.target.parentElement.classList.add("active")
                }

                this.calculateOrderTotal()
            },
            calculateOrderTotal() {
                // first reset
                this.basket_total = 0

                // then calculate new basket price
                for (var i = 0; i < this.basket.length; i++) {
                    this.basket_total += this.basket[i].price;
                }
            },
            submitOrder() {
                var self = this

                let order = {
                    "amount": this.basket.reduce((amount, item) => {
                        return amount + item.price
                    }, 0),
                    "items": this.basket.reduce((basket, item) => {
                        let obj = {}

                        obj.item = item
                        obj.quantity = 1

                        basket.push(obj)
                        return basket

                    }, []),
                    "user": JSON.parse(window.sessionStorage.getItem("user"))._id
                }

                // send actual order
                this.$http.post("order", order).then((order) => {
                    self.basket = []
                    self.basket_total = 0
                    bus.$emit("open__snackbar", "Succesfully submitted order", 5000)
                })
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