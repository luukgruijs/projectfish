"user strict"

const mongoose = require("mongoose")

const schemas = {
    "item": require("./schemas/item")(mongoose),
    "basket": require("./schemas/basket")(mongoose),
    "order": require("./schemas/order")(mongoose),
    "user": require("./schemas/user")(mongoose)
}

module.exports = schemas