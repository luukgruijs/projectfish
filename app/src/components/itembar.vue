<template>
    <div class="action__bar">
        <div class="action__bar--inner">
            <div class="header">
                <h2>add item</h2>
                <i class="icon close" @click.prevent="closeActionBar()">x</i>
            </div>
            <form>
                <fieldset>
                    <input type="text" placeholder="Item name " v-model="name" required/>
                    <input type="number" placeholder="Price name " v-model="price" required/>
                    <input type="submit" value="add item" class="button action" @click.prevent="createItem()">
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script>

    import { http } from "../client"

    export default {
        name: "itembar",
        props: ["item"],
        data() {
            return {
                type: "create",
                name: "",
                price: "",
                _id: "",
            }
        },
        watch: {
            item(value) {
                if (value) {
                    this.name = value.name;
                    this.price = value.price;
                    this.type = "edit"
                    this._id = value._id
                }
            }
        },
        methods: {
            closeActionBar() {
                document.querySelector(".action__bar").classList.remove("open")
            },
            createItem() {
                if (this.name && this.price) {
                    let item = {
                        "name": this.name,
                        "price": this.price,
                        "category": "fish"
                    }

                    // check type and do update/post
                    if (this.type === "create") {
                        http.post("items", item).then((item) => {
                            bus.$emit("open__snackbar", "test", 5000)
                            document.querySelector(".action__bar").classList.remove("open")

                            // reload
                            this.$emit("reload")
                        })
                    } else {
                        http.post("items/"+this._id, item).then((item) => {
                            bus.$emit("open__snackbar", "test", 5000)
                            document.querySelector(".action__bar").classList.remove("open")

                            //reload
                            this.$emit("reload")
                        })
                    }
                }
            }
        }
    }
</script>