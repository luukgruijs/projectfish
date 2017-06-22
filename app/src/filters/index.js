import Vue from "vue"
import { format } from "date-fns"

Vue.filter("date", (value) => {
    return format(value, "DD-MM-YYYY")
})

export default Vue