<template>
    <div class="snackbar" id="snackbar">
        <p>{{message}}</p>
        <a href="#" @click.prevent="close">close</a>
    </div>
</template>

<script>
    export default {
        name: "snackbar",
        data() {
            return {
                message: ""
            }
        },
        mounted() {
            var self = this

            bus.$on("open__snackbar", function(message, duration){
                document.getElementById("snackbar").classList.add("open")
                self.message = message

                setTimeout(() => {
                    document.getElementById("snackbar").classList.remove("open")
                }, duration)
            })
        },
        methods: {
            close() {
                document.getElementById("snackbar").classList.remove("open")
            }
        }
    }
</script>

<style lang="scss">
    .snackbar {
        position: fixed;
        bottom: -50px;
        background-color: $black;
        display: flex;
        height: 40px;
        width: 500px;
        left: 50%;
        margin-left: -250px;
        padding: 5px;
        -webkit-transition: bottom 200ms;
           -moz-transition: bottom 200ms;
            -ms-transition: bottom 200ms;
             -o-transition: bottom 200ms;
                transition: bottom 200ms;
        &.open {
            bottom: 0;
        }
        p, a {
            line-height: 40px;
            color: $white;
        }
        a {
            margin-left: auto;
            text-decoration: none;
            padding-right: 15px;
            &:hover {
                cursor: pointer;
            }
        }
    }
</style>