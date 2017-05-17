<template>
    <div class="order_now">
        <h1>Order</h1>
        <form>
            <input type="text" placeholder="search items" />
            <input type="submit" value="search" class="button action" @search.prevent="search"/>
        </form>
        <div class="row">
            <div class="items">
                <div class="item" v-for="item in items">
                    <span><a href="#"></a></span><p>{{item.name}}</p><p>{{item.price}}</p>
                </div>
            </div>
            <div class="basket">
                <div class="basket__inner">
                    <h2>Your order</h2>
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
                "order": [],
                "items": []
            }
        },

        created() {
            http.get("items").then((items) => {
                this.items = items.data
            })
        },
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
                }
            }
        }

        .row {
            display: flex;
            margin-top: 20px;
            height: 70%;
            .items {
                width: 60%;
                overflow-y: scroll;
                border: 1px solid darken($gray, 5%);
                .item {
                    display: flex;
                    line-height: 50px;
                    background-color: white;
                    border-bottom: 1px solid darken($gray, 5%);
                    span {
                        width: 20%;
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
                        width: 40%;
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
                    }
                }
            }
        }
    }
</style>