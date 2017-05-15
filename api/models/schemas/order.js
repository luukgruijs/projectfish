"user strict"

module.exports = function Order(mongoose) {
    var schema = new mongoose.Schema({
        "amount": {
            "desc": "The total order price",
            "required": true,
            "type": Number
        },
        "created_at": {
            "default": new Date(),
            "desc": "The date at which the order is placed",
            "type": Date
        },
        "orders": {
            "default": [],
            "desc": "A list of of all the orders",
            "type": [mongoose.Schema.Types.ObjectId]
        },
    })

    return mongoose.model("Order", schema)
}