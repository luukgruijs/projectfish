import Vue from "vue"
import { format } from "date-fns"

Vue.filter("date", function (value) => {
    return format(value, "DD-MM-YYYY")
})