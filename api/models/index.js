"user strict"

const mongoose = require("mongoose")

const schemas = {
    "item": require("./schemas/item")(mongoose),
    "order": require("./schemas/order")(mongoose),
    "lunch_order": require("./schemas/lunch_order")(mongoose),
    "user": require("./schemas/user")(mongoose)
}

module.exports = schemas