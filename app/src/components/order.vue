<template>
    <div class="container">
        <sidenav></sidenav>
        <div class="col manage" v-if="order">
            <div class="header">
                <h1>Order from {{order.created_at}}</h1>

            </div>
        </div>
    </div>
</template>

<script>

    import sidenav from "./sidenav.vue"

    export default {
        name: "order",
        components: { sidenav },
        data() {
            return {
                "order": {}
            }
        },
        created() {
            var self = this
            this.$http.get(`lunchorders/${this.$route.params.id}?_populate=orders`).then((order) => {
                self.order = order.body
            })
        }
    }
</script>

<style lang="scss">
</style>