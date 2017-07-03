import Vue from "vue"
import { format } from "date-fns"

Vue.filter("date", (value) => {
    return format(value, "DD-MM-YYYY")
})

Vue.filter("date", (value) => {
    return format(value, "DD-MM-YYYY")
})

Vue.filter("truncate", (text, length, clamp) => {
      clamp = clamp || "...";
      length = length || 30;

      if (text.length <= length) return text;

      let truncated_text = text.slice(0, length - clamp.length);
      let last = truncated_text.length - 1;


      while (last > 0 && truncated_text[last] !== " " && truncated_text[last] !== clamp[0]) last -= 1;

      // Fix for case when text dont have any `space`
      last = last || length - clamp.length;

      truncated_text =  truncated_text.slice(0, last);

      return truncated_text + clamp;
});

export default Vue