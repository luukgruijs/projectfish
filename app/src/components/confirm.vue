<template>
    <div class="overlay">
        <div class="confirm">
            <div class="confirm__header">
                <h2>Are you sure you want to delete this item?</h2>
            </div>
            <div class="confirm__body">
                {{message}}
            </div>
            <div class="confirm__footer">
                <button @click="cancel()">cancel</button>
                <button @click="confirm(data)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "confirm",

        props: ["message", "data"],
        data() {
            return {}
        },
        methods: {
            open() {
                console.log("open")
            },
            close() {

            },
            confirm(data) {

            }
        }
    }
</script>