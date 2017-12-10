<template>
  <div id="app">
    <navbar></navbar>
    <div class="container app-content">
      <router-view></router-view>
    </div>
    <snackbar></snackbar>
  </div>

</template>

<script>
import navbar from './navbar.vue'
import snackbar from "./snackbar.vue"

import { types } from '../store/login'

export default {
    name: 'app',
    components: { navbar, snackbar },
    data () {
        return {}
    },
    created() {
      const user = JSON.parse(window.sessionStorage.getItem("user"));
      if (user) {
        this.$store.commit(types.SET_CURRENTUSER, user)
      }
    }
}
</script>