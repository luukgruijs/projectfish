<template>
    <div class="items">
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data">
                    <td>{{item.name}}</td>
                    <td>{{item.category}}</td>
                    <td>{{item.price}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "datatable",
        props: ["data"],
        data() {
            return {}
        },
    }
</script>