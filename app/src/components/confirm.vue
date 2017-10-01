<template>
    <div class="overlay">
        <div class="confirm">
            <div class="confirm__header">
                <h2>Confirm</h2>
            </div>
            <div class="confirm__body">
                {{message}}
            </div>
            <div class="confirm__footer">
                <button @click="cancel(false)">cancel</button>
                <button @click="confirm(true)">Delete</button>
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
            confirm(confirmed) {
                this.$emit("confirm", confirmed)
            }
        }
    }
</script>