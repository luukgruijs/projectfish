<template>
    <div class="overlay">
        <div class="confirm">
            <div class="confirm__header">
                <h2>Confirm</h2>
            </div>
            <div class="confirm__body">
                <p>{{message}}</p>
            </div>
            <div class="confirm__footer">
                <button @click="cancel(false)">Cancel</button>
                <button @click="confirm(true)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "confirm",
        props: ["message"],
        data() {
            return {}
        },
        methods: {
            confirm(confirmed) {
                this.$emit("confirm", confirmed);
            },
            cancel(cancel) {
                this.$emit("cancel", cancel);
            }
        }
    }
</script>

<style lang="scss">
    .overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 999;
        background-color: rgba(0,0,0,.4);
        .confirm {
            width: 300px;
            height: 400px;
            background-color: $white;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -200px;
            margin-left: -150px;
            border-radius: 5px;
            border: 2px solid $gray;
            padding: 15px;
            .confirm__header {
                margin-bottom: 20px;
            }
            .confirm__body {
                p {
                    line-height: 25px;
                }
            }
            .confirm__footer {
                position: absolute;
                left: 0;
                bottom: 0;
                line-height: 40px;
                width: 100%;
                border-top: 2px solid $gray;
                button {
                    margin-right: auto;
                    border: none;
                    background-color: transparent;
                    margin-left: auto;
                    width: 49%;
                    outline: none;
                    &:first-of-type {
                        border-right: 2px solid $gray;
                    }
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>