<template>
    <div class="snackbar" id="snackbar">
        <p>{{message}}</p>

        <a href="#" @click.prevent="close">close</a>
    </div>
</template>

<script>
    export default {
        name: "snackbar",
        props: ["message"],
        data() {
            return {}
        },
        watch: {
            message: function(val) {
                console.log(val)
                document.getElementById("snackbar").classList.add("open")
            }
        },
        mounted() {
            bus.$on("open", function(message){
                console.log(message)
            })
        },
        methods: {
            close() {
                console.log("close")
            },
            open() {
                console.log("open")
            }
        }
    }
</script>