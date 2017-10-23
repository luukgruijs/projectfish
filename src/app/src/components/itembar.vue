 <template>
    <div class="action__bar" id="itembar" v-bind:class="{ open: open }">
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
                        <input type="submit" value="Save item" class="button action" @click.prevent="save()">
                    </fieldset>
                </form>
            </div>
            <div class="multiple__create" v-if="!edit_mode">
                <div class="header">
                    <h2>add multiple using csv</h2>
                </div>
                <dropzone id="item_dropzone" url="http://localhost:8002/v1/csv/items" v-bind:headers="headers" v-on:vdropzone-success="uploadSuccess">
                    <input type="hidden" name="token" value="xxx">
                </dropzone>
            </div>
        </div>
    </div>
</template>

<script>

    import Dropzone from "vue2-dropzone"
    import { mapGetters, mapActions } from "vuex"
    import { types } from "../store/items.js"

    export default {
        name: "itembar",
        components: { Dropzone },
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
        computed: {
            ...mapGetters({
                open: "edit_mode",
                item: "selected_item",
            })
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
            ...mapActions({
                create: "createItem",
                update: "updateItem",
            }),
            closeActionBar() {
                this.edit_mode = false;
                this.name = ""
                this._id = ""
                this.price = ""

                this.$store.commit(types.SET_ITEM_EDITMODE, false)
            },
            save() {
                if (this.name && this.price) {
                    let item = {
                        "name": this.name,
                        "price": this.price * Math.pow(10, 2),
                        "category": "fish"
                    }

                    // check type and do update/post
                    if (this.type === "create") {
                        this.create(item)
                    } else {
                        this.update({
                            item,
                            id: this._id,
                        })
                    }
                }
            },
            uploadSuccess() {
                // show message
                bus.$emit("open__snackbar", "Items uploaded", 5000)

                // close action bar
                this.closeActionBar()

                // get items
                this.$store.dispatch("getItems")
            }
        }
    }
</script>