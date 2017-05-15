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
                    <input type="text" placeholder="Price name " v-model="price" required/>
                    <input type="submit" value="add item" class="button action" @click.prevent="createItem()">
                </fieldset>
            </form>
        </div>
        <snackbar></snackbar>
    </div>
</template>

<script>

    import { http } from "../../client"
    import snackbar from "../shared/snackbar.vue"

    export default {
        name: "itembar",
        components: {snackbar},
        data() {
            return {
                name: "",
                price: ""
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

                    http.post("items", item).then((item) => {
                        bus.$emit("open", "test")
                    })
                }
            }
        }
    }
</script>