<template>
    <div class="action__bar">
        <div class="action__bar--inner">
            <div class="single__create">
                <div class="header">
                    <h2>add single item</h2>
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
            <div class="multiple__create">
                <div class="header">
                    <h2>add multiple using csv</h2>
                </div>
                <dropzone id="myVueDropzone" url="http://localhost:8000/v1/csv/items" v-bind:headers="headers" v-on:vdropzone-success="uploadSuccess">
                    <input type="hidden" name="token" value="xxx">
                </dropzone>
            </div>
        </div>
    </div>
</template>

<script>

    import Dropzone from "vue2-dropzone"

    export default {
        name: "itembar",
        components: { Dropzone },
        props: ["item"],
        data() {
            return {
                type: "create",
                name: "",
                price: "",
                _id: "",
                headers: {
                    "x-access-token": JSON.parse(window.sessionStorage.getItem("user")).token
                }
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
                        this.$http.post("items", item).then((item) => {
                            bus.$emit("open__snackbar", "test", 5000)
                            document.querySelector(".action__bar").classList.remove("open")

                            // reload
                            this.$emit("reload")
                        })
                    } else {
                        this.$http.post("items/"+this._id, item).then((item) => {
                            bus.$emit("open__snackbar", "test", 5000)
                            document.querySelector(".action__bar").classList.remove("open")

                            //reload
                            this.$emit("reload")
                        })
                    }
                }
            },
            uploadSuccess() {
                // show message
                bus.$emit("open__snackbar", "Items uploaded", 5000)

                // close action bar
                this.closeActionBar()

                // emit reload so we fetch the latest items
                this.$emit("reload")
            }
        }
    }
</script>