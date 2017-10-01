 <template>
    <div class="action__bar" id="settingsbar">
        <div class="action__bar--inner">
            <div class="single__create">
                <div class="header">
                    <h2>Edit settings</h2>
                    <i class="material-icons close" @click.prevent="closeActionBar()">close</i>
                </div>
                <form>
                    <fieldset>
                        <label for="budget"> Budget per order
                            <input type="text" id="budget" placeholder="Budget per order " v-model="budget" required />
                        </label>
                        <input type="submit" value="Save item" class="button action" @click.prevent="editSettings()">
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "settingsbar",
        props: ["item"],
        data() {
            return {
                budget: 0,
                _id: '',
            }
        },
        watch: {
            item(value) {
                if (value) {
                    this.budget = this.$options.filters.currency(value.budget)
                    this._id = value._id
                }
            },
        },
        methods: {
            closeActionBar() {
                this.edit_mode = false;
                document.querySelector(".action__bar").classList.remove("open")
            },
            editSettings() {

                const settings = {
                    budget: this.budget * Math.pow(10, 2)
                }

                this.$http.post(`settings/${this._id}`, settings).then((response) => {
                    bus.$emit("open__snackbar", `succesfully updated settings`, 5000)
                    document.querySelector(".action__bar").classList.remove("open")

                    //reload
                    this.$emit("reload")
                })
            },
        }
    }
</script>