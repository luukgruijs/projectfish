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

export default {
    name: 'app',
    components: { navbar, snackbar },
    data () {
        return {}
    }
}
</script>