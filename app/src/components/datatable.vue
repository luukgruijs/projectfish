<template>
    <table class="datatable">
        <thead>
            <tr>
                <th v-for="field in fields">{{field}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data">
                <td v-for="(field, index) in fields" @click.prevent="rowClicked(item)">
                    <span v-if="field === 'created_at'">{{ item[field] | date }}</span>
                    <span v-else-if="field === 'amount'">{{ item[field] | currency }}</span>
                    <span v-else-if="field === 'price'">{{ item[field] | currency }}</span>
                    <span v-else>{{ item[field] }}</span>
                </td>
                <span v-if="deleteable" class="delete"><i class="material-icons close" @click.prevent="deleteClicked(item)">close</i></span>
            </tr>
            <tr v-if="data.length === 0">
                <td colspan="data.length">Nothing to show yet</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import { format } from "date-fns"

    export default {
        name: "datatable",
        props: ["data", "fields", "deleteable"],
        methods: {
            rowClicked(item) {
                this.$emit("rowClicked", item)
            },
            deleteClicked(item) {
                this.$emit("deleteClicked", item)
            }
        }
    }
</script>

<style lang="scss">
    .datatable {
        width: 100%;
        margin-top: 15px;
        height: 70%;
        display: block;
        padding: 0 5px;
        thead {
            width: 100%;
            display: block;
            tr {
                width: 100%;
                display: flex;
                th {
                    text-align: left;
                    font-style: italic;
                    font-size: 12px;
                    padding: 0 15px;
                    line-height: 40px;
                    width: 33%;
                }
            }
        }
        tbody {
            overflow-y: scroll;
            display: block;
            width: 100%;
            height: 100%;
            tr {
                background-color: white;
                line-height: 60px;
                border: 1px solid darken($gray, 5%);
                width: 99%;
                display: flex;
                position: relative;
                &:nth-child(even) {
                    background-color: darken(white, 1%)
                }
                &:hover {
                    cursor: pointer;
                    .close {
                        display: block;
                    }
                }
                td {
                    padding: 0 15px;
                    width: 33%;
                }
                .close {
                    position: absolute;
                    right: 10px;
                    top: 18px;
                    display: none;
                }
            }
        }
    }
</style>