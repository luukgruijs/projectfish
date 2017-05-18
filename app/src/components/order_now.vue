<template>
    <div class="order_now">
        <h1>Order</h1>
        <form>
            <input type="text" placeholder="search items" />
            <input type="submit" value="search" class="button action" @search.prevent="search"/>
        </form>
        <div class="row">
            <div class="items">
                <div class="item" v-for="item in items" @click="addToBasket(item, $event)">
                    <span><a href="#"></a></span><p>{{item.name}}</p><p>{{item.price}}</p>
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { http } from "../client"

    export default {
        name: "order_now",
        data() {
            return {
                "basket": [],
                "basket_total": 0,
                "items": []
            }
        },

        created() {
            http.get("items").then((items) => {
                this.items = items.data
            })
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
                width: 87.5%;
                line-height: 40px;
                padding-left: 10px;
                margin-right: auto;
                &[type='submit'] {
                    width: 10%;
                    margin-left: auto;
                    margin-right: 0;
                    font-size: 14px;
                }
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
                }
            }
        }
    }
</style>