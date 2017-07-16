 <template>
    <div class="action__bar" id="itembar">
        <div class="action__bar--inner">
            <div class="single__create">
                <div class="header">
                    <h2><span  v-if="!edit_mode">Add</span><span v-if="edit_mode">Edit</span> single item</h2>
                    <i class="material-icons close" @click.prevent="closeActionBar()">close</i>
                </div>
                <form>
                    <fieldset>
                        <input type="text" placeholder="Item name " v-model="name" required/>
                        <input type="number" placeholder="Price name " v-model="price" required/>
                        <input type="submit" value="Save item" class="button action" @click.prevent="createItem()">
                    </fieldset>
                </form>
            </div>
            <div class="multiple__create" v-if="!edit_mode">
                <div class="header">
                    <h2>add multiple using csv</h2>
                </div>
                <dropzone id="item_dropzone" url="http://localhost:8000/v1/csv/items" v-bind:headers="headers" v-on:vdropzone-success="uploadSuccess">
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
                edit_mode: false,
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
                if (value && value.name && value.price) {
                    this.name = value.name
                    this.price = value.price
                    this.type = "edit"
                    this._id = value._id
                    this.edit_mode = true
                } else {
                    this.edit_mode = false
                }
            },
            edit_mode(value) {
                if (!value) {
                    this.name = ""
                    this._id = ""
                    this.price = ""
                }
            }
        },
        methods: {
            closeActionBar() {
                this.edit_mode = false;
                document.querySelector(".action__bar").classList.remove("open")
            },
            createItem() {
                if (this.name && this.price) {
                    let item = {
                        "name": this.name,
                        "price": this.price * Math.pow(10, 2),
                        "category": "fish"
                    }

                    // check type and do update/post
                    if (this.type === "create") {
                        this.$http.post("items", item).then((response) => {
                            bus.$emit("open__snackbar", `succesfully updated ${item.name}`, 5000)
                            document.querySelector(".action__bar").classList.remove("open")

                            // reload
                            this.$emit("reload")
                        })
                    } else {
                        this.$http.post("items/"+this._id, item).then((response) => {
                            bus.$emit("open__snackbar", `succesfully updated ${item.name}`, 5000)
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