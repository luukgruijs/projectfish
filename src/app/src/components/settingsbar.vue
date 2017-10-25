 <template>
    <div class="action__bar" id="settingsbar" v-bind:class="{ open: open }">
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

    import { mapGetters, mapActions } from "vuex";
    import { types } from "../store/settings.js"

    export default {
        name: "settingsbar",

        computed: {
            ...mapGetters({
                open: "setting_edit_mode",
                setting: "setting",
            })
        },
        data() {
            return {
                budget: 0,
                _id: '',
            }
        },
        watch: {
            setting(value) {
                console.log(value)
                if (value) {
                    this.budget = this.$options.filters.currency(value.budget)
                    this._id = value._id
                }
            },
        },
        methods: {
            ...mapActions({
                update: "updateSetting",
            }),
            closeActionBar() {
                this.$store.commit(types.SET_SETTING_EDITMODE, false)
            },
            editSettings() {

                const setting = {
                    budget: this.budget * Math.pow(10, 2)
                }

                this.update({
                    id: this._id,
                    setting
                })
            },
        }
    }
</script>