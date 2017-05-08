"use strict"

const mongoose = require("mongoose")
const models = require("../models")

exports.generate = function() {

    const item = new models.item()
    item.name = "Kibbeling"
    item.category = "fish"
    item.price = "7.50"

    const order = new models.order()
    order.amount = "7.50"
    order.created_at = new Date()
    order.items = [{
        "item_id": item._id,
        "quantity": 1
    }]

    const user = new models.user()
    user.name = "John doe"
    user.email = "john@projectfish.com"
    user.roles = ["admin"]
    user.password = "fishisnice"
    user.orders = [order._id]

    item.save()
    order.save()
    user.save()
}