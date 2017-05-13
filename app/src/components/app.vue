<template>
  <div id="app">
    <navbar></navbar>
    <div class="container app-content">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
import navbar from './navbar.vue'
export default {
    name: 'app',
    components: { navbar },
    data () {
        return {}
    }
}
</script>